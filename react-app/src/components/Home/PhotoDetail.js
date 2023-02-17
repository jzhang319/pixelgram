import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Home.css'
import * as photoActions from '../../store/photo'
import OpenModalButton from '../OpenModalButton';

function PhotoDetail() {

  const dispatch = useDispatch();
  const { id } = useParams();

  const currPhoto = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(photoActions.getThePhoto(id));
  }, [dispatch, id]);

  return (
    <div className='photodetail-container'>
      PhotoDetail
      <div>
        
      </div>
    </div>
  );
}

export default PhotoDetail
