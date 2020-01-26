<template>
  <div class="base-layout">
    <b-navbar
      toggleable="md"
      class="navbar navbar-dark fixed-top bg-success flex-md-nowrap p-0 shadow"
    >
      <b-navbar-brand
        class="navbar-brand col-sm-3 col-md-2 mr-0 text-center"
        href="#"
      >
        <div style="padding:5px">
          LicitaBoard
        </div>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            :active="activemenu == 2"
            :to="{ name: 'licitacoes'}"
            right
          >
            Ir para Dashboard
          </b-nav-item>
          <b-nav-item
            :active="activemenu == 1"
            :to="{ name: 'selecionar'}"
            right
          >
            Selecionar cidade
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="container-fluid ">
      <div class="row">
        <b-nav
          vertical
          class="col-md-2 d-none d-md-block bg-light sidebar"
        >
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted ">
              <span>Menu</span>
            </h6>

            <ul class="nav flex-column">
              <b-nav-item
                :active="activemenu == 1"
                :to="{ name: 'licitacoes'}"
              >
                Dashboard
              </b-nav-item>
              <b-nav-item
                :active="activemenu == 2"
                :to="{ name: 'selecionar'}"
              >
                Selecionar cidade
              </b-nav-item>
            </ul>
          </div>
        </b-nav>

        <main
          role="main"
          class="col-md-9 ml-sm-auto col-lg-10 px-4"
        >
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout',
  props: {
    activemenu: {
      type: String,
      default: '1',
      required: false
    }
  }
}
</script>
