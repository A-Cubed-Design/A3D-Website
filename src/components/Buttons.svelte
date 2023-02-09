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
        background: #670192cc;
        padding-bottom: 4em;
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
        background: #670192cc;
        padding: 4.5em 0 2.5em 0;
    }

    .contact-blurb p {
        padding-top: .5em;
        font-style: none;
        font-size: 1.6em;
        transform: skewX(0deg); 
    }

    @media (max-width: 360px) {
        .contact-blurb p {
            font-size: 1.2em;
        }
    }
</style>