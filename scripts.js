// firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyDoUcPh4_4QiDXXCFI5RVQwBj_aomGvLmA",
  authDomain: "bis-dismissal.firebaseapp.com",
  databaseURL: "https://bis-dismissal-default-rtdb.firebaseio.com",
  projectId: "bis-dismissal",
  storageBucket: "bis-dismissal.appspot.com",
  messagingSenderId: "1019941316312",
  appId: "1:1019941316312:web:92e539af021728e6d419ad"
}
firebase.initializeApp(firebaseConfig)
const db = firebase.database()

// end firebase configuration


// navigation

var state = {
  view: 'Dismissal',
  local: null
}

history.replaceState(state, null, '')
window.addEventListener('popstate', e => open(e.state))

const views = Array.from(document.querySelectorAll('.view'))

function open(state) {
  document.title = state.local == null ? state.view : state.local
  views.forEach(i => i.classList.add('hidden'))
  document.getElementById(state.view).classList.remove('hidden')
}

function changeView(view, local = null) {
  state.view = view
  state.local = local
  history.pushState(state, null, '')
  open(state)
}

// end navigation

// globals

var students = []
var classes_list = ['ELEMENTARY', 'MIDDLE & HIGH SCHOOL','MIDDLE SCHOOL', 'HIGH SCHOOL']
var cars = []

// end globals

// dates

function today() {
  var today = new Date()
	var year = today.getFullYear()
	var month = today.getMonth() + 1
	month < 10 ? (month = '0' + month.toString()) : null
	var day = today.getDate()
	day < 10 ? (day = '0' + day.toString()) : null
	return year + '-' + month + '-' + day
}

document.getElementById('carline-date').value = today()

// end dates

// load students, classes

db.ref('students/data').get()
.then(snap => {
  students = snap.val()
  
  // classes
  students.forEach(student => {
    var __class = student[2].toUpperCase().trim()
    if (!classes_list.includes(__class))
    classes_list.push(__class)
  })

  // cars
  // students.forEach(student => {
  //   var __student_cars = student[3]
  //   var __car = { students : [] }
  //   if (__student_cars != ''){
  //     var __car_student = {}
  //     __car_student.name = student[1] + ' ' + student[0]
  //     __car_student.grade = student[2]
  //     // if student has 2 or more cars
  //     if (__student_cars.includes(',')) {
  //       var __cars_list = __student_cars.split(', ')
  //       __cars_list.forEach(i => {
  //         var find_car = car => car.number === i
  //         var car_found = cars.find(find_car)
  //         if (car_found == undefined) {
  //           __car.students.push(__car_student)
  //           __car.number = i
  //           cars.push(__car)
  //           console.log(__cars_list,__car)
  //         } else {
  //           car_found.students.push(__car_student)
  //           console.log(__cars_list,__car, 'else')
  //         }
  //       })
  //     } else {
  //       // if student has 1 car
  //       var find_car = car => car.number == student[3]
  //       var car_found = cars.find(find_car)
  //       if (car_found == undefined) {
  //         __car.students.push(__car_student)
  //         __car.number = student[3]
  //         cars.push(__car)
  //       } else {
  //         car_found.students.push(__car_student)
  //       }
  //     }
  //   }
  // })

  
  students.forEach(student => {
    if (student[3].includes(',')) {
      var __list = student[3].split(',')
      var __cars_list = __list.map(i => i.trim())
      student[3] = __cars_list
    } else {
      var __list = [student[3]]
      var __cars_list = __list.map(i => i.trim())
      student[3] = __cars_list
    }
  })
  students.forEach(student => {
    if (student[4].includes(',')) {
      var __list = student[3].split(',')
      var __buses_list = __list.map(i => i.trim())
      student[4] = __buses_list
    } else {
      var __list = [student[4]]
      var __buses_list = __list.map(i => i.trim())
      student[4] = __buses_list
    }
  })

})
.catch(e => alert('Something went wrong (' + e.message + ')'))

// end load students, classes