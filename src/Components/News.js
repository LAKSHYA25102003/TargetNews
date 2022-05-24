import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=>{

    const [articles,setArticles]=useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [pageLimitingNumber,setPageLimitingNumber]=useState(0);
    const [totalArticles,setPageTotalArticles]=useState(0);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

        // document.title = `${this.capitalizeFirstLetter(props.category)}-TargetNews`;
    
    // nextHandler=()=>{
    //     this.setState((prevState)=>{
    //         let npage=prevState.page;
    //         npage++;
    //         return {

    //             page:npage,
    //         }
    //     })
    // }

    const UpdateNews=async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=1&pageSize=${props.pageSize}`;
        props.setProgress(30);
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(70);
        let parseData = await data.json();
        let totalArticles = parseData.totalResults;
        let num = Math.ceil(totalArticles / props.pageSize);
        setLoading(false);
        setPageTotalArticles(parseData.totalResults);
        setArticles(parseData.articles);
        setPageLimitingNumber(num);
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)}-TargetNews`
        UpdateNews();
    },[]);
    // async componentDidMount() {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=1&pageSize=${props.pageSize}`;
    //     props.setProgress(30);
    //     this.setState({
    //         loading: true
    //     })
    //     let data = await fetch(url);
    //     props.setProgress(70);

    //     let parseData = await data.json();
    //     let totalArticles = parseData.totalResults;

    //     let num = Math.ceil(totalArticles / props.pageSize);

    //     // console.log(parseData);
    //     this.setState({
    //         loading: false,
    //         totalArticles:parseData.totalResults,
    //         articles: parseData.articles,
    //         pageLimitingNumber: num
    //     })
    //     props.setProgress(100);
    // }
    // we can set the page size to show the number of articles of one page
    // nextHandler = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
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
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
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

    const fetchMoreData=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=0893bf57a89a4a4b8f4b4fcd6b0b815e&page=${page + 1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);

        let parseData = await data.json();
        // console.log(parseData);
     
            setArticles(articles.concat(parseData.articles));
            setPage(page + 1);
            setLoading(false);

    }

        return (
            <>

                <h2 className='text-center ' style={{marginTop:"80px"}}>NewsTarget-Top {capitalizeFirstLetter(props.category)} Headlines</h2>
                {loading && <Spinner />}
                {/* this if for the infinite scroll */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length<totalArticles}
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

export default News;
