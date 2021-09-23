import React from 'react'
import {useSelector } from 'react-redux';
import Todocard from './todocard';
const Todolist = () => {
    const posts = useSelector(state => state.posts);
    return (
            posts.map((post)=>(
              <Todocard post={post}/>
            ))
        )
    }

export default Todolist
