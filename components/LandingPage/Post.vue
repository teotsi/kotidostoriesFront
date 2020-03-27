<template>
  <nuxt-link class="col-lg-6 col-md-6" :to="id">
    <article>
      <div>
        <aside>
          <b-img src="https://picsum.photos/300/150/?image=41" fluid-grow class="img-responsive"/>
          <div class="content-title">
            <h2>{{title}}</h2>
          </div>
          <div class="content-preview">
            <p>{{preview}}</p>
          </div>
          <div class="content-footer">
            <b-icon icon="person-fill" class="user-small-img"></b-icon>
            <span style="font-size: 16px;color: #fff;">{{user}}</span>
            <span class="pull-right">
              <a href="#" data-toggle="tooltip" data-placement="left" title="Comments">
                <font-awesome-icon :icon="['far', 'comments']" />30</a>
              <a href="#" data-toggle="tooltip" data-placement="right" title="Loved">
                 <font-awesome-icon :icon="['far', 'heart']" />
                 20</a>
              </span>
          </div>
        </aside>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      preview: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      user: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

  a{
    text-decoration: none;
    color: black;
  }

  aside {
    margin-top: 30px;
    -webkit-box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);
    -moz-box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);
    box-shadow: 1px 4px 16px 3px rgba(199, 197, 199, 1);
  }

  .content-title {
    padding: 5px;
    background-color: #fff;
    text-align: center;
  }

  .content-preview {
    padding: 5px;
    background-color: #fff;
    text-align: center;
    color: #7F828B;
  }

  .content-title {
    background-color: white;
  }

  .content-footer {
    background-color: #950ca0;
    padding: 10px;
    position: relative;
  }

  .pull-right{
    float: right;
  }
</style>
