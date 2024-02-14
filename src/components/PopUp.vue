<template>
    <div class="popUp">
      <div class="row flex-column">
        <div class="col mt-15">
          <input type="text" v-model="newToDo" required>
          <label id="task">Task:</label>
        </div>
        <div class="col">
          <ul class="dropdown">
            <li class="defaultValue" @click="isActive = !isActive" :class="{ only: !isActive}">Status Auswählen</li>
            <li v-if="isActive" @click="status=1" class="first-drop" :class="{ selected: status==1}">ToDo</li>
            <li v-if="isActive" @click="status=2" class="second-drop" :class="{ selected: status==2}">Doing</li>
          </ul>
        </div>
        <div class="col">
          <label class="label deadline">Deadline:</label>
          <input type="date" class="timer" v-model="deadline">
        </div>
        <div class="col d-flex justify-content-end">
          <button type="submit" class="submit" @click="postTask();createNewTask=false">CREATE</button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from "axios"
export default defineComponent({
  name: 'HelloWorld',
  data () {
    return {
      taskList: [{id: 1, task: 'aaaa', done: false, status: 1, time: 5, deadline: "01-01-2023"}],
      isActive: false,
      status: 1,
      newToDo: '',
      done: false,
      deadline: '',
      time: '',
      createNewTask: true
    }
  },
  methods: {
    postTask () {
      let time = this.calcTime()
      let text = this.newToDo
      const task = {
        id: this.taskList[this.taskList.length - 1].id + 1,
        task: this.newToDo,
        done: false,
        status: this.status,
        time: time,
        deadline: this.deadline
      }
      console.log("before:", this.taskList)
      this.taskList.push(task)
      console.log("after: ", this.taskList)
      this.newToDo = ''
      axios.post("http://localhost:8080/api/todos", {
        id: this.taskList[this.taskList.length - 1].id,
        task: text,
        done: false,
        status: this.status,
        time: time,
        deadline: this.deadline
      }) 
      
        .then((response) => {
          console.log("res: ", response)
        })
        .catch((error) => {
          console.log("error: ", error)
        })
      this.$emit('getListe', this.taskList)
    },
    calcTime () {
      // let deadline = new Date(this.testyear, this.testmonth - 1, this.testday)
      let deadline = new Date(this.deadline)
      let now = new Date()
      now.setHours(0, 0, 0, 0)
      deadline.setHours(0)
      let time = (deadline.getTime() - now.getTime()) / 86400000
      return time
    }
  }
})
</script>
<style scoped lang="scss">
* {
  --border-radius: 10px;
}

.popUp {
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  padding: 0;
  z-index: 2;
  & > .row {
    width: 100%;
    padding: 20px;
    padding-top: 35px;
    background: white;
  }
}
input {
  width: 100%;
  font-size: 20px;
  text-decoration: none;
  margin-bottom: 20px;
  border: 1px solid;
  border-radius: var(--border-radius);
  padding: 5px;
  &:focus {
    outline: none;
    border-color: #fc00ff;
    & ~ #task {
      transition: all 0.3s ease-in-out;
      top: 30px !important;
      font-size: 14px;

    }
  }
  &:valid ~ #task {
    top: 30px !important;
    font-size: 14px;
  }
}
#task {
  position: absolute;
  top: 57px;
  left: 40px;
  font-size: 20px;
  color: #212529;;
}
.label.deadline {
  font-size: 14px;
  margin-left: 7px;
}
.dropdown {
  padding: 0;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: height .4s ease;
  & li {
    list-style: none;
    background-color: black;
    border: 1px solid black;
    color: white;
    width: 200px;
    padding: 10px;
    top: 0;
    &.only {
      border-radius: var(--border-radius) !important;
    }
  }
  & li:last-child {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
  & li:first-child {
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }
  & > .defaultValue::after {
    content: "+";
    float: right;
  }
}
@keyframes slideDown {
  0% {
      transform: translateY(-60px);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
}
.first-drop {
  opacity: 0;
  transform-origin: top center;
  animation: slideDown 300ms 60ms ease-in-out forwards;
}
.second-drop {
  opacity: 0;
  transform-origin: top center;
  animation: slideDown 300ms 120ms ease-in-out forwards;
}
select {
  width: 100%;
  height: 55px;
  border: none;
  border-bottom: 1px solid black;
}
.selected::after {
  content: " \2718";
  color: #4ae690;
}
.hide {
  display: none;
}
.submit {
  width: 100%;
  border-radius: 25px;
  background-image: linear-gradient(to right, #fc00ff, #00dbde);
  border: none;
  color: white;
  padding: 10px;
  font-size: 20px;
  &:hover {
    background-image: linear-gradient(to left, #fc00ff, #00dbde);
  }
}
.mt-15 {
  margin-top: 15px;
}
</style>
