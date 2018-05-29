'use strict';

import React from 'react';
import {updatePosts} from "../../../action/ama";
import {findAncestor} from "../../../util/domTraversal";

export const Likes = props => {

    // Supportive Functions ----------------------------------------------------------------------------------------------------------//
    function dispatchUpdatePostsCall(event, LikeCount, callType) {
        let closestPostCardParent = findAncestor(event.currentTarget, 'postCardsLists');
        if (closestPostCardParent === null) {
            closestPostCardParent = findAncestor(event.currentTarget, 'Detail-Post-Page-Post-Wrapper');
        }
        let postCardId = closestPostCardParent.dataset.postId;
        let updatePostCardBody = Object.assign({}, props.postData);
        delete updatePostCardBody._id;
        updatePostCardBody['likeCount'] = LikeCount;
        if (callType === 'Increment') {
            updatePostCardBody['likedBy'].push(props.userId);
        } else {
            let userIdIndexValue = props.postData.likedBy.indexOf(props.userId);
            updatePostCardBody['likedBy'].splice(userIdIndexValue, 1);
        }
        props.dispatch(updatePosts(postCardId, updatePostCardBody));
        return;
    }

    function incrementCount(event) {
        let incrementLikeCount = Number(event.currentTarget.lastElementChild.innerHTML) + 1;
        event.currentTarget.lastElementChild.innerHTML = incrementLikeCount;
        dispatchUpdatePostsCall(event, incrementLikeCount, 'Increment');
        return;
    }

    function decrementCount(event) {
        let decrementedLikeCount = Number(event.currentTarget.lastElementChild.innerHTML);
        if (decrementedLikeCount >= 1) {
            decrementedLikeCount = decrementedLikeCount - 1;
        }
        event.currentTarget.lastElementChild.innerHTML = decrementedLikeCount;
        dispatchUpdatePostsCall(event, decrementedLikeCount);
        return;
    }

    function handleLikeClick(event) {
        event.preventDefault();
        if (props.postData.likedBy.indexOf(props.userId) >= 0) {
            let element = event.currentTarget.firstChild;
            element.classList.remove('liked-post');
            decrementCount(event);
        } else {
            let element = event.currentTarget.firstChild;
            element.classList.add('liked-post');
            incrementCount(event);
        }
        return;
    }

    function handleLikeToggle(){
        if (props.postData.likedBy.indexOf(props.userId) >= 0) {
            return(
                <svg className="Like-Wrapper-UpVote-img liked-post" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                    <path
                        d="M58.328 20.944c-2.5-0.656-8.378-0.648-16.976-0.876 0.406-1.876 0.5-3.568 0.5-6.572 0-7.176-5.228-13.496-9.852-13.496-3.266 0-5.958 2.67-6 5.954-0.044 4.028-1.29 10.984-8 14.512-0.492 0.26-1.9 0.954-2.106 1.044l0.106 0.090c-1.050-0.906-2.506-1.6-4-1.6h-6c-3.308 0-6 2.692-6 6v32c0 3.308 2.692 6 6 6h6c2.38 0 4.372-1.438 5.336-3.454 0.024 0.008 0.066 0.020 0.094 0.024 0.132 0.036 0.288 0.074 0.478 0.124 0.036 0.010 0.054 0.014 0.092 0.024 1.152 0.286 3.37 0.816 8.11 1.906 1.016 0.232 6.384 1.376 11.944 1.376h10.934c3.332 0 5.734-1.282 7.164-3.856 0.020-0.040 0.48-0.938 0.856-2.152 0.282-0.914 0.386-2.208 0.046-3.52 2.148-1.476 2.84-3.708 3.29-5.16 0.754-2.382 0.528-4.172 0.004-5.454 1.208-1.14 2.238-2.878 2.672-5.532 0.27-1.644-0.020-3.336-0.778-4.744 1.132-1.272 1.648-2.872 1.708-4.352l0.024-0.418c0.014-0.262 0.026-0.424 0.026-1 0-2.526-1.75-5.748-5.672-6.868zM14 58c0 1.106-0.894 2-2 2h-6c-1.106 0-2-0.894-2-2v-32c0-1.106 0.894-2 2-2h6c1.106 0 2 0.894 2 2v32zM59.954 29.070c-0.040 0.988-0.454 2.93-3.954 2.93-3 0-4 0-4 0-0.554 0-1 0.448-1 1s0.446 1 1 1c0 0 0.876 0 3.876 0s3.394 2.488 3.2 3.688c-0.248 1.492-0.948 4.312-4.326 4.312-3.374 0-4.75 0-4.75 0-0.554 0-1 0.446-1 1 0 0.55 0.446 1 1 1 0 0 2.376 0 3.938 0 3.376 0 3.078 2.574 2.594 4.11-0.638 2.018-1.028 3.89-5.282 3.89-1.438 0-3.262 0-3.262 0-0.554 0-1 0.446-1 1 0 0.55 0.446 1 1 1 0 0 1.386 0 3.136 0 2.188 0 2.29 2.070 2.062 2.812-0.25 0.812-0.546 1.414-0.558 1.442-0.604 1.090-1.578 1.746-3.64 1.746h-10.934c-5.492 0-10.94-1.246-11.080-1.278-8.308-1.914-8.746-2.062-9.268-2.21 0 0-1.692-0.286-1.692-1.762l-0.014-27.624c0-0.938 0.598-1.786 1.588-2.084 0.124-0.048 0.292-0.1 0.412-0.15 9.136-3.784 11.918-12.080 12-18.892 0.012-0.958 0.75-2 2-2 2.114 0 5.852 4.244 5.852 9.496 0 4.742-0.192 5.562-1.852 10.504 20 0 19.86 0.288 21.624 0.75 2.188 0.626 2.376 2.438 2.376 3.062 0 0.686-0.020 0.586-0.046 1.258zM9 52c-1.656 0-3 1.344-3 3s1.344 3 3 3 3-1.344 3-3-1.344-3-3-3zM9 56c-0.55 0-1-0.45-1-1s0.45-1 1-1 1 0.45 1 1-0.45 1-1 1z">
                    </path>
                </svg>
            )
        }else{
            return(
                <svg className="Like-Wrapper-UpVote-img" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                    <path
                        d="M58.328 20.944c-2.5-0.656-8.378-0.648-16.976-0.876 0.406-1.876 0.5-3.568 0.5-6.572 0-7.176-5.228-13.496-9.852-13.496-3.266 0-5.958 2.67-6 5.954-0.044 4.028-1.29 10.984-8 14.512-0.492 0.26-1.9 0.954-2.106 1.044l0.106 0.090c-1.050-0.906-2.506-1.6-4-1.6h-6c-3.308 0-6 2.692-6 6v32c0 3.308 2.692 6 6 6h6c2.38 0 4.372-1.438 5.336-3.454 0.024 0.008 0.066 0.020 0.094 0.024 0.132 0.036 0.288 0.074 0.478 0.124 0.036 0.010 0.054 0.014 0.092 0.024 1.152 0.286 3.37 0.816 8.11 1.906 1.016 0.232 6.384 1.376 11.944 1.376h10.934c3.332 0 5.734-1.282 7.164-3.856 0.020-0.040 0.48-0.938 0.856-2.152 0.282-0.914 0.386-2.208 0.046-3.52 2.148-1.476 2.84-3.708 3.29-5.16 0.754-2.382 0.528-4.172 0.004-5.454 1.208-1.14 2.238-2.878 2.672-5.532 0.27-1.644-0.020-3.336-0.778-4.744 1.132-1.272 1.648-2.872 1.708-4.352l0.024-0.418c0.014-0.262 0.026-0.424 0.026-1 0-2.526-1.75-5.748-5.672-6.868zM14 58c0 1.106-0.894 2-2 2h-6c-1.106 0-2-0.894-2-2v-32c0-1.106 0.894-2 2-2h6c1.106 0 2 0.894 2 2v32zM59.954 29.070c-0.040 0.988-0.454 2.93-3.954 2.93-3 0-4 0-4 0-0.554 0-1 0.448-1 1s0.446 1 1 1c0 0 0.876 0 3.876 0s3.394 2.488 3.2 3.688c-0.248 1.492-0.948 4.312-4.326 4.312-3.374 0-4.75 0-4.75 0-0.554 0-1 0.446-1 1 0 0.55 0.446 1 1 1 0 0 2.376 0 3.938 0 3.376 0 3.078 2.574 2.594 4.11-0.638 2.018-1.028 3.89-5.282 3.89-1.438 0-3.262 0-3.262 0-0.554 0-1 0.446-1 1 0 0.55 0.446 1 1 1 0 0 1.386 0 3.136 0 2.188 0 2.29 2.070 2.062 2.812-0.25 0.812-0.546 1.414-0.558 1.442-0.604 1.090-1.578 1.746-3.64 1.746h-10.934c-5.492 0-10.94-1.246-11.080-1.278-8.308-1.914-8.746-2.062-9.268-2.21 0 0-1.692-0.286-1.692-1.762l-0.014-27.624c0-0.938 0.598-1.786 1.588-2.084 0.124-0.048 0.292-0.1 0.412-0.15 9.136-3.784 11.918-12.080 12-18.892 0.012-0.958 0.75-2 2-2 2.114 0 5.852 4.244 5.852 9.496 0 4.742-0.192 5.562-1.852 10.504 20 0 19.86 0.288 21.624 0.75 2.188 0.626 2.376 2.438 2.376 3.062 0 0.686-0.020 0.586-0.046 1.258zM9 52c-1.656 0-3 1.344-3 3s1.344 3 3 3 3-1.344 3-3-1.344-3-3-3zM9 56c-0.55 0-1-0.45-1-1s0.45-1 1-1 1 0.45 1 1-0.45 1-1 1z">
                    </path>
                </svg>
            )
        }
    }

    // Supportive Functions ----------------------------------------------------------------------------------------------------------//


    return (
        <span className="Like-Wrapper">
                <a href="#" className="Like-Wrapper-UpVote" onClick={handleLikeClick}>
                    {handleLikeToggle()}
                    <span className="Like-Wrapper-UpVote-text">{props.postData.likeCount}</span>
                </a>
        </span>
    );
};
