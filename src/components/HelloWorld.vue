<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 class="text-center">ToDo-Liste</h3>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-end">
        <button type="submit" class="submit" @click="createNewTask=true" :class="{hide: createNewTask}">+ CREATE TASK</button>
      </div>
    </div>
    <div class="row popup">
      <PopUp :taskList="taskList" @getListe="getTaskList($event)" v-if="createNewTask==true"/>
      <div class="col">
        <button type="submit" class="closing-btn" @click="createNewTask=false" :class="{hide: !createNewTask}">Close</button>
      </div>
    </div>
    <div class="row">
      <div class="col" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
        <h4>TODO</h4>
        <div class="card" v-for="todo in taskList" v-bind:key="todo.id" v-bind:for="todo.id" draggable @dragstart="startDrag($event, todo)" v-bind:class="{todo: todo.status==1}">
        <ion-icon name="trash-bin-outline" class="trash" @click="deleteToDo(todo.id)"></ion-icon>
          <div class="text">
            <p>{{todo.task}}</p>
            <div class="timertext">Du hast {{todo.time}} Tage zeit</div>
          </div>
        </div>
      </div>
      <div class="col" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
        <h4> DOING </h4>
        <div class="card" v-for="todo in taskList" v-bind:key="todo.id" v-bind:for="todo.id" draggable @dragstart="startDrag($event, todo)" v-bind:class="{doing: todo.status==2}">
        <ion-icon name="trash-bin-outline" class="trash" @click="deleteToDo(todo.id)"></ion-icon>  
         <div class="text">
            <p>{{todo.task}}</p>
            <div class="timertext">Du hast noch {{todo.time}} Tage zeit</div>
          </div>
        </div>
      </div>
      <div class="col" @drop="onDrop($event, 3)" @dragover.prevent @dragenter.prevent>
        <h4> DONE </h4>
        <div class="card" v-for="todo in taskList" v-bind:key="todo.id" v-bind:for="todo.id" draggable @dragstart="startDrag($event, todo)" v-bind:class="{done: todo.status==3}">
        <ion-icon name="trash-bin-outline" class="trash" @click="deleteToDo(todo.id)"></ion-icon>
          <div class="text">
            <p>{{todo.task}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopUp from "@/components/PopUp.vue";
import axios from 'axios';

interface Task {
  id: number;
  task: string;
  status: number;
  time: number;
  deadline: string;
  done: boolean;
}

export default defineComponent({
  name: 'HelloWorld',
  components: {
    PopUp
  },
  data () {
    return {
      createNewTask: false,
      taskList: [] as Task []
    }
  },
  methods: {
    getTaskList (taskList: { id: number; task: string; status: number; time: number; deadline: string; done: boolean; }[]) {
      this.taskList = taskList
    },
    startDrag (evt: DragEvent, todo: { id: number; task: string; status: number; time: number; deadline: string; done: boolean; }) {
      evt.dataTransfer!.dropEffect = 'move'
      evt.dataTransfer!.effectAllowed = 'move'
      evt.dataTransfer!.setData('itemID', todo.id.toString())
    },
    onDrop (evt: DragEvent, status: number) {
      const itemID = evt.dataTransfer!.getData('itemID')
      const todo = this.taskList.find((todo) => todo.id.toString() == itemID)
      if (todo) {
        todo.status = status;
        // this.updateToDo()
      } else {
        console.error(`Todo with id ${itemID} not found`);
      }
    },
  /*   toDoDone (done: boolean, id: any) {
      this.taskList.done = !this.taskList.done
      done = this.taskList.done
      axios.put(`/api/change?done=${done}&id=${id}`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }, */
/*     updateToDo () {
      for (let i = 0; i < this.taskList.length; i++) {
        let id = this.taskList[i].id
        let status = this.taskList[i].status
        let deadline = this.taskList[i].deadline
        let deadlineDate = new Date(deadline)
        let now = new Date("2023-01-15")
        now.setHours(0, 0, 0, 0)
        deadlineDate.setHours(0)
        let newtime = (deadlineDate.getTime() - now.getTime()) / 86400000
        console.log(now)
        console.log(deadlineDate)
        console.log(newtime)
        axios.put(`/api/edit?id=${id}&status=${status}&time=${newtime}`)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }, */
    deleteToDo (id: number) {
      this.taskList = this.taskList.filter(todo => todo.id !== id)
      axios.delete(`http://localhost:8080/api/todos/${id}`)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getTodos () {
  /*     this.updateToDo() */
      axios.get('http://localhost:8080/api/todos')
      .then( (response) => {
        for (let i of response.data) {
          this.taskList.push(i)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      }); 
    }
  },
  mounted () {
    this.getTodos()
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin-top: 50px;
}
.hide {
  visibility: hidden;
}
.submit {
  width: 100%;
  height: 44px;
  border-radius: 24px;
  background-image: linear-gradient(to right, #fc00ff, #00dbde);
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 12.8px;
  &:hover {
    background-image: linear-gradient(to left, #fc00ff, #00dbde);
  }
}
.card {
  border: 1px solid black;
  margin: 10px 30px;
  height: auto;
  width: 244px;
  padding: 10px;
  display: none;
  margin-left: 0;
  &.todo, &.done, &.doing {
    display: block;
  }
}
.trash {
  position: absolute;
  right: 0;
  top: 0;
  margin: 5px;
}
.timertext {
  background-color: lightgray;
  border-radius: 15px;
  padding: 5px;
}
.text > p {
  margin: 10px 0px;
}
.closing-btn {
  position: absolute;
  top: 7px;
  z-index: 3;
  right: 7px;
  border: none;
  background: lightgray;
  border-radius: 15px;
  padding: 3px 8px;
}
.popUp + .col {
  display: flex;
  justify-content: center;
}
.popup.row {
  --pop-up-width: 450px;
  margin: 0;
  position: absolute;
  top: 30%;
  left: calc(50% - (var(--pop-up-width) / 2));
  width: var(--pop-up-width);
}
</style>
