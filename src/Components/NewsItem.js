import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imgUrl,newsUrl}=this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={imgUrl?imgUrl:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170"} className="card-img-top" alt="News-Image"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More...</a>
                </div>
        </div>
        
        
      </div>
      
    )
  }
}

export default NewsItem
