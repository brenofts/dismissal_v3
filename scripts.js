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
