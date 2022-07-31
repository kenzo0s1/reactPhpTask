import BlockWithNews from "../components/news";
import '../styles/newsPage.scss'
import React, {Component} from 'react';
import axios from "axios";
import Loader from "../components/loader";

class News extends Component {
    state = {
        isLoad:false,
        posts:[{name:'',text:'',date:'',id:'0'}]
    }
     componentDidMount() {
        let formData = new FormData()
        formData.append("getPost",5)
         axios.post('http://62.217.176.86:80/api.php/', formData)
            .then(async res => {
                console.log(res.data)
                await this.setState({posts:res.data})
                this.setState({isLoad:true})
                // let arr = JSON.stringify(res.data)
                // console.log(res.data[0])
                })
            .catch(async (err) => {
                })
            }
    render() {
        return (
            <div className={'newsPage'} >
                { (this.state.isLoad === true) ?
                   this.state.posts.map((post) => {
                       return (

                           <BlockWithNews key={post.id} name={post.name} text={post.text} data={post.date}>

                           </BlockWithNews>

                       )
                   }) : <Loader></Loader>
                }


            </div>
        );
    }
}

export default News;