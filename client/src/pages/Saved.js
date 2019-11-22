import React, {Component} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ResultsContainer from "../components/ResultsContainer";
import API from "../utils/API";
import DeleteButton from "../components/DeleteButton";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import Container from "../components/Container";

class Saved extends Component {
    state = {
        articles:[],
        isModalOpen: false
    };

    toggleModal () {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    componentDidMount() {
        this.loadArticles();
    };

    loadArticles = () => {
        API.getArticles({}).then(res => {
            console.log(res);
            this.setState({articles: res.data})
        })
        .catch(err => console.log(err));
    };

    handleDelete = id => {
        API.deleteArticle(id).then(res => {
            this.loadArticles();
        }).catch(err => console.log(err))
    };

    handleDeleteAll = () => {
        API.deleteAllArticle().then(res => {
            this.loadArticles();
        }).catch(err => console.log(err))
    };

    render() {
        return(
            <Container fluid>
            <Jumbotron>
            {"Saved Articles"}
            </Jumbotron>
                {this.state.articles.length ? (
                    <ResultsContainer fluid>
                        {this.state.articles.map(article => {
                            return (<div className="col-sm-12 col-md-4 col-lg-4 col-xl-3"><Card 
                            key={article._id}
                            title={article.title}
                            authors={article.authors}
                            date={article.date}
                            description={article.description}
                            link={article.link}
                            image={article.image}
                            />
                            <DeleteButton 
                                onClick={() => this.handleDelete(article._id)}>
                                {article.title}
                            </DeleteButton>
                            </div>
                            );
                        })}
                        <div class="align-self-center mx-auto">
                            <Button color="info" onClick={() => this.handleDeleteAll()}>
                                Delete All
                            </Button>
                        </div>
                    </ResultsContainer>
                ) : (
                    <h3>No Saved Articles</h3>
                )}
            </Container>
        );
    };

}

export default Saved;