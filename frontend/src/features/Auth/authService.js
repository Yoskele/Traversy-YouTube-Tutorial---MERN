import React from 'react'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = '/api/users/'
// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user.
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})


const authService = {
    register,
    login,
    logout
}

export default authService;
