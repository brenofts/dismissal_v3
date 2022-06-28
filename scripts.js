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
var buses = []

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
  document.getElementById('loading').classList.add('hidden')
  document.getElementById('main').classList.remove('hidden')
  edit_cars()
})
.catch(e => alert('Something went wrong (' + e.message + ')'))

// end load students, classes


// cars and buses
function edit_cars() {
  var new_cars = students.map(student => {
    var __cars_list = student[3]
    __cars_list.forEach(car => {
      if (car != '') {
        if (!cars.some(i => i._id === car)) {
          var __car = {}
          __car._id = car
          __car.students = []
          cars.push(__car)
        }
      }
    })
  })
  add_car_students()
}

function add_car_students() {
  var new_cars = students.map(student => {
    var __student = {l_name : student[0], 
                     f_name : student[1],
                     grade : student[2]}
    var __cars_list = student[3]
    __cars_list.forEach(car => {
      if (car != '') {
        var find_car = i => i._id == car
        var car_found = cars.find(find_car)
        car_found.students.push(__student)
      }
    })
  })
  edit_buses()
}

function edit_buses() {
  var new_cars = students.map(student => {
    var __buses_list = student[4]
    __buses_list.forEach(bus => {
      if (bus != '') {
        if (!buses.some(i => i._id === bus)) {
          var __bus = {}
          __bus._id = bus
          __bus.students = []
          buses.push(__bus)
        }
      }
    })
  })
  add_bus_students()
}

function add_bus_students() {
  var new_cars = students.map(student => {
    var __student = {l_name : student[0], 
                     f_name : student[1],
                     grade : student[2]}
    var __buses_list = student[4]
    __buses_list.forEach(bus => {
      if (bus != '') {
        var find_bus = i => i._id == bus
        var bus_found = buses.find(find_bus)
        bus_found.students.push(__student)
      }
    })
  })
}
// end cars and buses

// carline

function select_date() {
  document.getElementById('date-selected').innerText = document.getElementById('carline-date').value
  document.getElementById('select-date').classList.add('hidden')
  document.getElementById('div-carline').classList.remove('hidden')
}
function change_date() {
  document.getElementById('select-date').classList.remove('hidden')
  document.getElementById('div-carline').classList.add('hidden')
}

// end carline