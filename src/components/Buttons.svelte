<script>
    import {activeView} from '../stores';
    
    function formHandler() {
      $activeView = 'ourTeam';
    }

    function formHandlerContactForm() {
        $activeView = 'form';
    }
</script>

<!-- <div class="button-bg">
    <a class= "button" href="#ourteam" on:click={formHandler}><p>Our Full Team</p></a>
</div> -->

<div class="contact-blurb values-bg-color">
    <h1>Values Assessment</h1>
    <p>At A Cubed Design, we are always collecting feedback from the blindness community. If you'd like to provide input on our device, choose the appropriate link below, based on whether you are a braille user or an instructor.</p>
    <!-- <p><a href="#contact" on:click={formHandlerContactForm}><strong>Click here</strong></a> to fill out our contact form</p> -->
</div>

<div class="team-button-bg values-bg-color">
    <a class= "team-button values-btn-spacing" href="https://docs.google.com/forms/d/e/1FAIpQLSdt0PoNJQlBr3lVpwvZ9xfZB2toBHDUEY7p2gzTShYFLugh7A/viewform"><p>Braille Users</p></a>
    <a class= "team-button values-btn-spacing" href="https://docs.google.com/forms/d/e/1FAIpQLSc31W_pOdlMAF_LtNyXoI6qnzhveSxSTjc4TaeOsubNr039nw/viewform"><p>Teachers / AT Instructors</p></a>
</div>

<div class="contact-blurb">
    <h1>Get Involved</h1>
    <p>Interested in getting involved and learning more?</p>
    <!-- <p><a href="#contact" on:click={formHandlerContactForm}><strong>Click here</strong></a> to fill out our contact form</p> -->
</div>

<div class="team-button-bg">
    <a class= "team-button" href="#contact" on:click={formHandlerContactForm}><p>Contact Us</p></a>
</div>

<style>
    .button-bg {
        display: flex;
        justify-content: center;
        background-color: rgba(41, 41, 41, .8);
    }

    .team-button-bg {
        display: flex;
        justify-content: center;
        background: rgba(41, 41, 41, .8);
        padding-bottom: 4em;
    }

    .values-bg-color {
        background: #670192cc !important;
    }

    .values-btn-spacing {
        margin: 20px;
    }

    .button {
        font-size: 2em;
        background: linear-gradient(108deg, #670192cc 23%, #56037c 73%, #480368cc 96%);
        padding: 10px;
        width: 280px;
        margin-bottom: 4em;
        text-align: center;
        border-radius: 5px;
        color:#E8E5DA ;
        font-weight: bold;
        line-height: 25px;
        border-style: solid;
        border-width: 2px;
        transform: skewX(-17deg);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .team-button {
        font-size: 2em;
        background: rgba(41, 41, 41, .8);
        padding: 10px;
        width: 280px;
        margin-bottom: .8em;
        text-align: center;
        border-radius: 5px;
        color:#E8E5DA ;
        font-weight: bold;
        line-height: 25px;
        border-style: solid;
        border-width: 2px;
        transform: skewX(-17deg);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        transform: skewX(17deg); 
    }

    .button:hover {
        background: hsla(0, 0%, 53%, .6)
    }

    .team-button:hover {
        background: hsla(0, 0%, 53%, .6);
    }

    .contact-blurb {
        background: rgba(41, 41, 41, .8);
        padding: 4.5em 0 2.5em 0;
    }

    .contact-blurb p {
        padding-top: .5em;
        font-style: none;
        font-size: 1.6em;
        transform: skewX(0deg); 
    }

    @media (min-width: 960px) {
        .contact-blurb p {
            margin-left: auto;
            margin-right: auto;
            width: 960px;
        }
    }

    @media (max-width: 500px) {
        .team-button-bg {
            flex-direction: column;
        }

        .team-button-bg a {
            margin-left: auto;
            margin-right: auto;
        }
    }

    @media (max-width: 360px) {
        .contact-blurb p {
            font-size: 1.2em;
        }
    }
</style>