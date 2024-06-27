import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButtonHandler from '../components/BackButtonHandler/BackButtonHandler';

const Blog = () => {
  return (
    <BackButtonHandler>
      <Text>Blog</Text>
    </BackButtonHandler>
  );
};

export default Blog;

const styles = StyleSheet.create({});
