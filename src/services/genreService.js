import React, { Component } from 'react';
import axios from 'axios'
import config from '../config.json'
import httpService from './httpService';


export function getGenres() {
    return httpService.get('/genres')
}