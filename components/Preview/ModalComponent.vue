<template>
    <div>
    <!-- <b-button @click="show=true" variant="primary">Show Modal</b-button> -->
  
    <a class="button" href="#popup">Open Modal</a>
    <div class="popup" id="popup">
      <div class="popup-inner">
          <div class="popup__photo"></div>
            <div class="popup-under-photo">
              <div class="popup__text">
                <h1>Lorem ipsum dolor sit amet by <a href="#" style="font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-decoration: underline;
  text-transform: uppercase;
  color: #0A0A0A;">Author</a></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.                </p>
              </div>
              <!-- <div class="popup__text">
                <h1>Lorem ipsum dolor sit amet</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.</p>
              </div> -->
            </div>
            <div class="reactions">
              <input class="like-button" id="like-button" type="checkbox"/>
              <label for="like-button">❤</label>
              <span style=" color:#aab8c2; font-size:24px;">23.5k</span>
              <a href="#"><span class="comment-icon"></span></a>
              <ButtonComponent class="read-button" msg="Read It" :is-ghost="false"/>
            </div>
            
            <a class="popup__close" href="#">X</a>
        
      </div>
    </div>
    </div>


<!-- 
    <b-modal
      v-model="show"
      title="Modal Variants"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <b-container fluid>
        
      </b-container>

      <template v-slot:modal-footer>
        <div class="w-100">
          <p class="float-left">Modal Footer Content</p>
          <b-button
            variant="nick"
            size="sm"
            class="float-right"
            @click="show=false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal> -->
  
</template>

<script>
  import ButtonComponent from "@/components/Login_SignUp/ButtonComponent";

export default {
    components: {
      ButtonComponent
    }
}
</script>

<style scoped>



@media screen and (max-width: 768px) {
  html, body {
    font-size: 12px;
  }
}
.container {
  background-color: #9191E9;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  width: 100vw;
  height: 100vh;
}

.button {
  text-decoration: none;
  font-size: .875rem;
  font-weight: 300;
  text-transform: uppercase;
  display: inline-block;
  border-radius: 1.5rem;
  background-color: #fff;
  color: #9191E9;
  padding: 1rem 2rem;
}

.popup {
 
  /* display: -webkit-box;
  display: flex; */
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
  visibility: hidden;
  opacity: 0;
  overflow: auto;
  -webkit-transition: .2s ease-in-out;
  transition: .2s ease-in-out;
}
.popup-inner {
  border-radius: 2.5%;
  position: absolute;
  top: 5%;
  left: 20%;
  /* top: 100px;
  left:100px; */
  display: -webkit-box;
   display: flexbox; 
  -webkit-box-align: center;
          align-items: center;
  background-color: #fff;
  /* -webkit-transform: rotate(32deg);
          transform: rotate(32deg); */
  -webkit-transition: opacity .64s ease-in-out;
  transition: opacity .64s ease-in-out;
  overflow:hidden;
  width:60%;
  height:90%; 
}
.popup__photo {
  border-top-left-radius: 2.5%;
  display: -webkit-box;
  display:flex;
  -webkit-box-pack: center;
          justify-content: center;
  -webkit-box-align: center;
          align-items: center;
  background-image: url('../../assets/horror-img.jpg');
  height:30vh;
  background-position: flex-top;
  background-size:100%;
  background-repeat: no-repeat;
}
  
/* .popup__photo img {
  width: auto;
  height: 40%;
} */
.popup__text {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -webkit-box-pack: center;
          justify-content: center;
  width: 100%;
  height: 48.5vh;
  padding: 4rem;
  overflow: hidden;
  padding-bottom:0px;
}
.popup__text h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  margin-left: 24px;
  text-transform: uppercase;
  color: #0A0A0A;
}
.popup__text p {
  font-size: .875rem;
  color: #686868;
  line-height: 1.5;
  overflow: auto;
}
.popup:target {
  visibility: visible;
  opacity: 1;
}
.popup:target .popup-inner {
  bottom: 0;
  right: 0;
  -webkit-transform: rotate(0);
          transform: rotate(0);
}
.popup__close {
  position: fixed;
  right: 1rem;
  top: 0.25rem;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 100%;
  background-color: #FFFFFF;
  z-index: 4;
  color: #000000;
  line-height: 3rem;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
}

.popup__close:hover{
  opacity:0.60;
  -webkit-transition: .4s ease-out;
  transition: .4s ease-out;
}
.popup-under-photo{
  display: flex;
}

.read-button{
  float: right;
  cursor:pointer;
  /* position:relative; */
  transition:0.2s;
  text-align: center;
  
}

.read-button {
  
  text-align: center;
  font-size: 24px;
  padding: 16px;
  width: 168px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 18px;
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
}

.read-button{
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.read-button:after {
  content: url(http://icons.iconarchive.com/icons/iconsmind/outline/24/Books-icon.png);
  position: absolute;
  opacity: 0;  
  top: 20px;
  right: -20px;
  transition: 0.5s;
}

.read-button:hover{
  padding-right: 35px;
  padding-left:8px;
}

.read-button:hover:after {
  opacity: 1;
  right: 24px;
}

.like-button{
  margin-top:55px;
  margin-left: 68px;
}

[id='like-button'] {
  
  visibility: hidden;
}

[for='like-button'] {
  color: #aab8c2;
  font-size: 32px;
  cursor: pointer;
  align-self: center;
}

[id='like-button']:checked + label {
  color: #e2264d;
}

@keyframes heart { 0%, 17.5% { font-size: 0; } }

[id='like-button']:checked + label {
  will-change: font-size;
  animation: heart .64s cubic-bezier(.17, .89, .32, 1.49);
}

.comment-icon{
  content: url(http://icons.iconarchive.com/icons/icons8/windows-8/32/Business-Comments-icon.png);
  padding-left: 40px;
  
}

</style>