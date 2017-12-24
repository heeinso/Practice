<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Animations</h1>
        <hr>
        <button class="btn btn-primary" @click="show = !show">Show alert</button>
        <br><br>
        <transition name="fade">
          <div class="alert alert-info" v-show="show">This is some info</div>
        </transition>
        <transition name="slide" type="animation">
          <div class="alert alert-info" v-if="show">This is some info</div>
        </transition>
        <transition name="fade" appear>
          <div class="alert alert-info" v-if="show">This is some info</div>
        </transition>
        <hr>
        <button class="btn btn-primary"
        @click="selectedComponent == 'app-success-alert' ? selectedComponent = 'app-danger-alert' : selectedComponent = 'app-success-alert'">Toggle Components</button>
        <br><br>
        <transition name="fade" mode="out-in">
        <component :is="selectedComponent"></component>
        </transition>
        <hr>
        <button class="btn btn-primary" @click="addItem">Add Item</button>
        <br><br>
        <ul class="list-group">
          <li
              class="list-group-item"
              v-for="(number, index) in numbers"
              @click="removeItem(index)"
              style="cursor: pointer">{{ number }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import DangerAlert from './DangerAlert.vue';
  import SuccessAlert from './SuccessAlert.vue';

  export default {
    data() {
      return {
        show: true,
        selectedComponent: 'app-success-alert',
        numbers: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      addItem() {
        const pos = Math.floor(Math.random() * this.numbers.length);
        this.numbers.splice(pos, 0, this.numbers.length + 1);
      },
      removeItem(index) {
        this.numbers.splice(index, 1);
      }
    },
    components: {
      appDangerAlert: DangerAlert,
      appSuccessAlert: SuccessAlert
    }
  }
</script>

<style>
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave {
    /*opacity: 1;*/
  }

  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }

  .slide-enter {
    /*transform: translateY(20px);*/
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
  }

  .slide-leave {

  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 3s;
    opacity: 0;
  }
  
  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }
  
  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }


</style>
