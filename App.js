import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector'
import FlipCamera from "react-native-vector-icons/Ionicons"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  //  const [myface, setMyFace]= useState(0)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [PIN, setPIN] = useState("")

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleFacesDetected = ({ faces }) => {


    faces.map(
      (each_face) => {
        if (each_face.smilingProbability > 0.3) {
          return (

            setModalVisible(true)



          )
        } else {

          return (
            setModalVisible(false)

          )
        }
      }
    )







    // faces.map(
    //   (each_face) => {
    //     if (each_face.faceID) {

    //       // console.log(each_face.faceID)
    //     } else {
    //       // console.log("Randy, You are frowning")
    //     }
    //   }
    // )










  }


  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,

        }}

      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> <FlipCamera size={50} name="camera-reverse-outline" /> </Text>
          </TouchableOpacity>
        </View>
      </Camera>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

        {/* <KeyboardAwareScrollView> */}
        <View style={styles.centeredView}>


          <View style={styles.modalView}>
            <Text style={styles.modalText1}>SMILE ALERT!</Text>
            <Text style={styles.modalText}>You Just Smiled!</Text>
            <Text style={styles.modalText}>Now Enter Your <Text style={{ fontWeight: "bold" }}> MOBILE MONEY</Text> PIN to make a random person i'll choose smile too. </Text>

            <View style={styles.inputs}>
              <TextInput style={styles.InputPIN} keyboardType='numeric' maxLength={1} value={PIN} onChangeText={(text) => { setPIN(text) }} />
              <TextInput style={styles.InputPIN} keyboardType='numeric' maxLength={1} value={PIN} onChangeText={(text) => { setPIN(text) }} />
              <TextInput style={styles.InputPIN} keyboardType='numeric' maxLength={1} value={PIN} onChangeText={(text) => { setPIN(text) }} />
              <TextInput style={styles.InputPIN} keyboardType='numeric' maxLength={1} value={PIN} onChangeText={(text) => { setPIN(text) }} />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}

            >
              <Text style={styles.go}>SEND</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.cancel}>X</Text>
            </TouchableOpacity> */}





          </View>

        </View>

      </Modal>




      {/* {faces.face} */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  camera: {
    flex: 1,
  },



  buttonContainer: {

    // justifyContent: 'center',
    // alignItems: "center"
    position: 'absolute',
    bottom: 0,
    alignSelf: "center"
  },

  text: {
    fontSize: 100,
    color: "white",


  },

  InputPIN: {
    fontSize: 20,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,

    padding: 6,
    paddingHorizontal: 15,
    marginHorizontal: 5
  },





  //Modal Styling:
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    zIndex: 9999,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },




  button: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 2,


  },

  go: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: 20
  },

  cancel: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,


  },

  inputs: {
    flexDirection: "row"
  },
  modalText1: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: "bold",
    color: "green",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: "bold"

  },

  serviceProvider: {
    marginBottom: 10
  },

  success: {
    fontWeight: "bold",
    color: "#32D554",
    fontSize: 20
  },

  confirm: {
    fontSize: 20,
    fontWeight: "bold"
  }


});
