import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    constructor(props) {

        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            pageLimitingNumber: 0,
            totalArticles:0


        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)}-TargetNews`;
    }
    // nextHandler=()=>{
    //     this.setState((prevState)=>{
    //         let npage=prevState.page;
    //         npage++;
    //         return {

    //             page:npage,
    //         }
    //     })
    // }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=1&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        this.props.setProgress(70);

        let parseData = await data.json();
        let totalArticles = parseData.totalResults;

        let num = Math.ceil(totalArticles / this.props.pageSize);

        // console.log(parseData);
        this.setState({
            loading: false,
            totalArticles:parseData.totalResults,
            articles: parseData.articles,
            pageLimitingNumber: num
        })
        this.props.setProgress(100);
    }
    // we can set the page size to show the number of articles of one page
    // nextHandler = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({
    //         loading: true
    //     })
    //     let data = await fetch(url);

    //     let parseData = await data.json();
    //     console.log(parseData);
    //     this.setState({

    //         loading: false,
    //         articles: parseData.articles,
    //         page: this.state.page + 1
    //     })
    // }
    // prevHandler = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({
    //         loading: true
    //     })
    //     let data = await fetch(url);

    //     let parseData = await data.json();
    //     console.log(parseData);
    //     this.setState({
    //         articles: parseData.articles,
    //         page: this.state.page - 1,
    //         loading: false
    //     })

    // }

    fetchMoreData=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);

        let parseData = await data.json();
        // console.log(parseData);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            page: this.state.page + 1,
            loading: false
        })

    }


    render() {
        const articles = this.state.articles;

        return (
            <>

                <h2 className='text-center my-3'>NewsTarget-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}
                {/* this if for the infinite scroll */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length<this.state.totalArticles}
                    loader={<Spinner/>} >

                    <div className="container">
                    { <div className="row">
                        {articles.map((article) => {
                            return (
                                <div className="col-md-4" key={article.url} >
                                    <NewsItem title={article.title} description={article.description} imgUrl={article.urlToImage} newsUrl={article.url} author={article.author} date={article.publishedAt} />
                                </div>
                            )
                        })}
                    </div>}
                    </div>
                    </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-danger mx-1" onClick={this.prevHandler}>&#8592;Previous </button>
                    <button disabled={this.state.page === this.state.pageLimitingNumber} type="button" className="btn btn-danger mx-1" onClick={this.nextHandler}>Next&rarr;</button>
                </div> */}

            </>
        )
    }
}
