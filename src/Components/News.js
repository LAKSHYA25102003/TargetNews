import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';


export default class News extends Component {
    
    constructor()
    {

        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
            pageLimitingNumber:0
        }
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
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data= await fetch(url);
        
        let parseData= await data.json();
        let totalArticles=parseData.totalResults;
        let num=Math.ceil(totalArticles/this.props.pageSize);

        // console.log(parseData);
        this.setState({
            loading:false,
            articles:parseData.articles,
            pageLimitingNumber:num
        })
    }
    // we can set the page size to show the number of articles of one page
    nextHandler=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data= await fetch(url);
        
        let parseData= await data.json();
        console.log(parseData);
        this.setState({
            
            loading:false,
            articles:parseData.articles,
            page:this.state.page+1
        })
    }
    prevHandler=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data= await fetch(url);
        
        let parseData= await data.json();
        console.log(parseData);
        this.setState({
            articles:parseData.articles,
            page:this.state.page-1,
            loading:false
        })

    }
    

  render() {
    const articles=this.state.articles;

    return (
      <div className='container my-3'>
          
          <h2 className='text-center'>NewsTarget-Top Headlines</h2>
          {this.state.loading&&<Spinner/>}

        {!this.state.loading&&<div className="row">
        {articles.map((article)=>{
            return (
            <div className="col-md-4" key={article.url} >
                <NewsItem title={article.title} description={article.description} imgUrl={article.urlToImage} newsUrl={article.url} author={article.author} date={article.publishedAt}/>
            </div>
            )
        })}
        </div>}
        <div className="d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-danger mx-1" onClick={this.prevHandler}>&#8592;Previous </button>
            <button disabled={this.state.page===this.state.pageLimitingNumber}  type="button" className="btn btn-danger mx-1" onClick={this.nextHandler}>Next&rarr;</button>
        </div>
        
      </div>
    )
  }
}
