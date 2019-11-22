import React, {Component} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SearchBar from "../components/SearchBar";
import ResultsContainer from "../components/ResultsContainer";
import API from "../utils/API";
import SaveButton from "../components/SaveButton";
import FormButton from "../components/FormButton";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import Container from "../components/Container";

class Articles extends Component {
    state = {
        articles: [],
        title: "",
        authors: [],
        date: "",
        description: "",
        image: "",
        link: "",
        saved: false,
        isModalOpen: false,
        modelBody: ""
    };

    toggleModal () {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSave = article => {
        var cleanedDate = article.publishedAt.replace("T", " ");
        cleanedDate = cleanedDate.replace("Z", "");
        console.log(cleanedDate)
            API.saveArticle({
                title:article.title,
                description: article.description,
                link: article.url,
                authors: article.author,
                image: article.urlToImage,
                date: cleanedDate
            })
            .then(res => {
                console.log("Returned from DB")
                this.setState({
                    modelBody: "\'" + article.title + "\' Successfully Saved into Database"
                })
            }) 
            .catch(err => {
                console.log(err);
                this.setState({
                    modelBody: "Failed to Save \'" + article.title + "\' into Database"
                })
            });
            this.toggleModal();
    };

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state.title);
        if (this.state.title === '' ) {
            alert("Please Provide an Input")
        }
        else {
            API.searchAPI({
                title: this.state.title
            }).then(res => {
                if (res.data.totalResults === 0){
                    alert("No Results Found")
                }
                else {
                    for(var i = 0; i < res.data.articles.length; i++) {
                        this.setState({
                            articles: res.data.articles
                        })
                    }
                }
            })
            .catch(err => {
                alert(err)
                console.log(err)
            });
        }
    };

    


    render() {
        return(
            <Container fluid>
            <Jumbotron>
            {"News Search"}
            <a class="lead"><span>   Powered by </span></a>
            <a class="lead" href="https://newsapi.org/"><span>NewsAPI.org</span></a>
            <a class="lead"><span> and credits to </span></a>
            <a class="lead" href="https://github.com/MarquisdeGeek/0day"><span> MarquisdeGeek</span></a>
            </Jumbotron>
                <form>
                    <SearchBar
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                        placeholder="Enter country name or keyword"
                        />
                    <FormButton
                        onClick={this.handleFormSubmit}
                    >Search
                    </FormButton>
                </form>
                {this.state.articles.length ? (
                    <ResultsContainer fluid>
                        {this.state.articles.map(article => {
                            return (<div 
                            className="col-sm-12 col-md-4 col-lg-4 col-xl-3"><Card key={article._id}
                            title={article.title}
                            authors={article.author}
                            date={article.publishedAt}
                            description={article.description}
                            link={article.url}
                            image={article.urlToImage !== undefined ? 
                                article.urlToImage : "https://via.placeholder.com/100"}
                            />
                            <SaveButton 
                                onClick={() => this.handleSave(article)}>
                            </SaveButton>
                            <Modal isOpen={this.state.isModalOpen}>
                            <ModalHeader>System Message</ModalHeader>
                            <ModalBody toggle={this.toggleModal.bind(this)}>{this.state.modelBody}</ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggleModal.bind(this)}>OK</Button>
                            </ModalFooter>
                            </Modal>
                            </div>
                            );
                        })}
                    
                    </ResultsContainer>
                ) : (
                    <h3>No Results to Display</h3>
                )}
            </Container>
        );
    };
}

export default Articles;