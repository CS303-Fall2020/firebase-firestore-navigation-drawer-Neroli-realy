import React , { useState , useEffect} from 'react';
import {
  StyleSheet,
  View, 
  Alert, 
  FlatList, 
  TouchableWithoutFeedback, 
  Keyboard, 
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  BackHandler} from 'react-native';
import {useNetInfo} from "@react-native-community/netinfo";
import Task from '../components/Task';
import Add from '../components/AddTask';
import 'firebase/firestore';
import { YellowBox } from 'react-native';
import {setTodo, getTodos, deleteTodo} from '../../../firebase/commands'

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);


export default function Home({route, navigation}){
  const [count, setcount] = useState(0);
  const [tasks, setTask] = useState([]);
  const [animate, setAnimate] = useState(false);  
  
  const pressHandler = (key) => {
    setTask((prev) => {
      return prev.filter(todo => todo.key !== key);
    });
    let y = tasks.filter(todo => todo.key !== key);
    save(y);
    deleteTodo(key);

  }

  const addHandler = async (text) => {
    if(text === ''){
      Alert.alert("Error", "Enpty not allowed");
    }
    else{
      Keyboard.dismiss();
      let news = {name: text, Checked: false, key: (count + 1).toString()};
    setAnimate(true);
    setTask((prev) => {
      return[
        news,
        ...prev
      ]
    })
    let s = [news, ...tasks];
    setcount(() => { return count + 1});
    console.log(s);
    save(s);
    setAnimate(false);
    
  }
    
  }
  
  const netinfo = useNetInfo();

  const checkHandler= (key) => {
    let i = 0;
    for(i = 0; i < tasks.length; i++){
      if(tasks[i].key === key)
        break;
    }
   
    let x = tasks.map(todo => todo.key === key ? {name: tasks[i].name, Checked: !tasks[i].Checked, key: tasks[i].key}: todo);
    setTask(x);
    save(x);
    
  
  }

  const navHandler = (item) => {
    navigation.navigate('Details', item);
  }

  
 
  const refresh = async () => {
    setTask(() => {return[]});
    setAnimate(true);
     let y = await getTodos(route.params.uid);
     let c = 0;
     y.forEach(tsk => {
       if(parseInt(tsk.key) > c)
        c = parseInt(tsk.key);
     });
     setTask(y);
     //AsyncStorage.setItem('ToDos', JSON.stringify(y));
     setcount(parseInt(c)+1);
     console.log(route.params.uid);
    setAnimate(false);
  }

    const save = (list) =>{
   //  AsyncStorage.setItem('ToDos', JSON.stringify(list));
     list.forEach(task => {
       try{
       setTodo(task.key, task.name, task.Checked);
       }catch(error){
         console.log(error);
       }
     });
  }
  useEffect(() => {
    route.params.test(navigation)
    console.log(route.params);
      if(route.params?.name){
      setTask(() => {
        let x = tasks.map(todo => todo.key === route.params.key ? {name: route.params.name , Checked: route.params.Checked, key: route.params.key} : todo);
        save(x);
        return x;
      });
      
    }else{
     refresh();
    } 
  }, [route.params?.name]);

  return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container}>
        <View style={styles.content}>  
          {!netinfo.isConnected && (
          <Text onPress={() => refresh()}style={styles.noConnected}>
            you are not connected click here or refresh button to 
            refresh from the local data
          </Text>)}
          {!animate &&
            (
              <Add addHandler={addHandler}/>
          )}
          {animate && (
            <ActivityIndicator
              style={{ height: 80 }}
              color="#C00"
              size="large"
            />
          )}
          <FlatList
            data={tasks}
            renderItem={({item}) => (
              <Task 
              item={item} 
              pressHandler={pressHandler} 
              checkHandler={checkHandler} 
              navigationHandler={navHandler}
              />
            )}
          />
          <View>
          <Button color={netinfo.isConnected? 'green': 'red'} onPress={() => refresh()} title='refresh'/>
          </View>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    content: {
      flex: 1
    },
    noConnected: {
      marginBottom: 10,
      textDecorationLine: 'underline',
      color: 'blue',
      fontWeight: 'bold',
      backgroundColor: 'yellow'
    }
  });
  