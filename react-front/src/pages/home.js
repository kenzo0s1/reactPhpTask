import React, {Component} from 'react';
import axios from "axios";
import BlockWithNews from "../components/news";
import '../styles/home.scss'
import Btn from "../components/btn";
import Loader from "../components/loader";
import {Link} from "react-router-dom";
class Home extends Component {
    state = {
        isLoad:false,
        posts:[{name:'',text:'',date:'',id:'0'}]
    }
    async componentDidMount() {
        let formData = new FormData()
        formData.append("getPost", 3)
        await axios.post('http://62.217.176.86:80/api.php/', formData)
            .then(async res => {
                console.log(res.data)
                await this.setState({posts: res.data})
                this.setState({isLoad:true})
                // let arr = JSON.stringify(res.data)
                // console.log(res.data[0])
            })
            .catch(async (err) => {
            })
    }
    render() {
        return (
            <div>



                <div className={'homePage'} >
                    { (this.state.isLoad === true) ?
                        this.state.posts.map((post) => {
                            return (

                                <BlockWithNews key={post.id} name={post.name} text={post.text.split('.')[0]} data={post.date}>

                                </BlockWithNews>

                            )
                        })
                        : <Loader></Loader>
                    }
                </div>
                <div className={'mainLinks'}>
                    <Link to="/news"><Btn text={'Все новости'}></Btn></Link>
                    <Link to="/form"> <Btn text={'Оставить заявку'}></Btn></Link>

                </div>

            </div>
        );
    }
}

export default Home;