import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async dispatch =>{
    const responce = await jsonPlaceholder.get('/posts');
    dispatch( {type: 'FETCH_POSTS', payload: responce.data } )
};

export const fetchUser = id => async dispatch => {
    const responce = await jsonPlaceholder.get(`/users/${id}`);
    dispatch ( { type: 'FETCH_USER', payload: responce.data} )
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    //console.log("fetchPostsAndUsers: ", getState().posts);
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};