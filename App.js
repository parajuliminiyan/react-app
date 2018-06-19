import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceDetail from "./src/components/PlaceDetails/PlaceDetail";


export default class App extends Component {
  state = {
    places: [],
    selectedPlace : null
  };

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: {
            uri: "https://i.pinimg.com/originals/74/cf/1f/74cf1f1c3581d78f2428a39c3bb8c917.jpg"
          }
        })
      };
    });

  };
  placeSelectedHandler = key =>{
    this.setState(prevState => {
      return {
        selectedPlace : prevState.places.find(place =>{
          return place.key === key;
        })
      }
    })
    
  };
  placeDeletedHandler = () => {
    this.setState(prevState=>{
      return{
        places: prevState.places.filter(place=>{
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace : null
      };
    });
  };

  modalClosedHandler = () => {
    this.setState({
      selectedPlace : null
    });

  };



  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
        selectedPlace = {this.state.selectedPlace}
        onItemDeleted = {this.placeDeletedHandler}
        onModalClosed = {this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});