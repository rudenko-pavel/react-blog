import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchPostsAndUsers } from '../actions';
import UserHeader from './UserHeader';

import './scss/PostList.scss';

class PostList extends Component{
    componentDidMount(){
        this.props.fetchPostsAndUsers();
    }

    renderList(){
        return this.props.posts.map(post =>{
            return (
                <div className="ui item" key={post.id} >
                    <i className="large middle  aligned icon user" />
                    <div className="content">
                        <div className="desciption">
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                            <UserHeader userId={post.userId} />
                        </div>
                    </div>
                </div>
            );
        });
    }

    render(){
        console.log ("render()",this.props.posts);
        return( //название разное для разных приложений
            <div className="ui relaxed divided list">
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{ // see to `src/reducers/index.js`
    return { 
        posts: state.posts
    };
}

export default connect(mapStateToProps,{
    fetchPostsAndUsers: fetchPostsAndUsers
})(PostList);