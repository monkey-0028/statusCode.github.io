//all variables
var number_input = document.querySelectorAll(".user_detail")
var i = 0
var catch_element;
var mainUser;
var mainJob;
let loginStatus = null;
var storeEM;
var storeName;
var storePass;

var canHandle = 1 //1 means true
// this is flag that controls the eventListners

// ------------------------- Backend work ---------------------------------------------------------------
// Replace with your actual Render URL
const baseUrl = 'https://statuscodebackend.onrender.com';
        
// Variable to store user data
let userData = [];
let jobData = []

// Fetch users from the backend and store in userData
async function fetchUsers() {
    try {
        const response = await fetch(`${baseUrl}/users`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        userData = await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
async function fetchJobs() {
    try {
        const response = await fetch(`${baseUrl}/jobs`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        jobData = await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
// Function to send OTP request
async function sendOtp(email) {

    const response = await fetch('https://statuscodebackend.onrender.com/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    const result = await response.json();

    if (result.success) {
        alert("OTP is sent")
    } else {
        alert("OTP can't send")
    }
}

// Function to verify OTP
async function verifyOtp(email, otp) {
    const response = await fetch('https://statuscodebackend.onrender.com/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp })
    });

    const result = await response.json();
    return result.success;  // Return the success value
}

// Function to add a new user
async function addUser(uEmail,uPass,uName,uOwnJob,uAppliedJob,uJobGiven,uTags,urating,uacAge) {
    const user = {
        email: uEmail,
        password: uPass,
        name: uName,
        ownedJobId: uOwnJob,
        appliedJobId: uAppliedJob,
        jobGivenId: uJobGiven,
        tags: uTags,
        rating:urating,
        acAge:uacAge
    };
    const response = await fetch('https://statuscodebackend.onrender.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
    const result = await response.text();
    console.log(result);
}
// Function to update an existing user
async function updateUser(userEmail,passw,namee,ojob,ajob,gjob,utags,urating,uacAge) {
    const updatedUser = {
        password: passw,
        name: namee,
        ownedJobId: ojob,
        appliedJobId: ajob,
        jobGivenId: gjob,
        tags: utags,
        rating: urating,
        acAge: uacAge
    };
    const response = await fetch(`https://statuscodebackend.onrender.com/users/${userEmail}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
    });
    const result = await response.text();
    console.log(result);
}

// Add job data
async function addJob(jobID, ownerEmail, tags, appliedUsers) {
    // Prepare the job data
    const jobData = {
        jobID: parseInt(jobID),   // Convert jobID to an integer
        ownerEmail: ownerEmail,
        tags: tags,
        appliedUsers: appliedUsers
    };

    // Try to send the data to the backend
    try {
        const response = await fetch('https://statuscodebackend.onrender.com/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });

        // Ensure the response is in JSON format
        const result = await response.json();

        if (response.ok) {
            console.log('Job added successfully!');
            return result;  // Return the result if needed
        } else {
            console.error(`Error: ${result.message}`);
            return result;  // Return the result if needed
        }
    } catch (error) {
        console.error(`Failed to add job: ${error.message}`);
        throw error;  // Re-throw the error to handle it outside the function if needed
    }
}

// updating job
async function updateJob(jobID, ownerEmail, tags, appliedUsers) {
    // Prepare the updated job data
    const jobData = {
        jobID: parseInt(jobID),   // Convert jobID to an integer
        ownerEmail: ownerEmail,
        tags: tags,
        appliedUsers: appliedUsers
    };

    // Try to send the data to the backend
    try {
        const response = await fetch(`https://statuscodebackend.onrender.com/jobs/${jobID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });

        // Ensure the response is in JSON format
        const result = await response.json();

        if (response.ok) {
            console.log('Job updated successfully!');
            return result;  // Return the result if needed
        } else {
            console.error(`Error: ${result.message}`);
            return result;  // Return the result if needed
        }
    } catch (error) {
        console.error(`Failed to update job: ${error.message}`);
        throw error;  // Re-throw the error to handle it outside the function if needed
    }
}





fetchUsers()
fetchJobs()
//-----------------------------------------------------------------------------------------------------------

// function: handle reaction of input tag{username,password} //input_tag_reaction
function input_tag_reaction(){
    if(canHandle == 0){
        return;
    }
    em = this.lastElementChild
    em.removeAttribute('value')
    em.style.color = "black"
    if(em.name == "password"){
        em.setAttribute('type','password')
    }
    em.focus()
    catch_element = this

    // function: animation of input tag{username,password}
    var hght = 28
    var wdth = 250
    function animate_input_tag(timestamp){
        hght += 1
        wdth += 1
        catch_element.style.height = hght + "px"
        catch_element.style.width = wdth + "px"

        if(hght < 40){
            requestAnimationFrame(animate_input_tag)
        }
    }
    requestAnimationFrame(animate_input_tag)
}


for(i;i<number_input.length;i++){
    number_input[i].addEventListener("click",input_tag_reaction)
    catch_element = number_input[i]
    number_input[i].lastElementChild.addEventListener("blur",function(){
        if(canHandle == 0){
            return;
        }
        //function: animate the blur effect
        var hght = 40
        var wdth = 262
        function animate_blur(timestamp){
            hght -= 1
            wdth -= 1
            catch_element.style.height = hght + "px"
            catch_element.style.width = wdth + "px"

            if(hght != 28){
                requestAnimationFrame(animate_blur)
            }
        }
        requestAnimationFrame(animate_blur)

    })
}

// don't use var, use const keyword instead.. using this you can avoid shitty bugs and issues
// above shit take me almost 5 fucking hours

//animating pinless checkbox
const pinless_checkbox = document.querySelector(".pin > svg")
var toggle_pinless_checkbox = 0 //0 means uncheck
var click_or_not = 0 //0 means not
pinless_checkbox.addEventListener("click",function(){
    if(canHandle == 0){
        return;
    }
    click_or_not = 1
    var angle = 0
    var op = 100
    var vl = 0
    const object1 = document.querySelector("#pass")
    const object2 = document.querySelector("#pass svg")
    
    function animate_pinless_checkbox(){
        angle += 30
        vl += 1
        if((angle > 200) && (toggle_pinless_checkbox == 0)){
            pinless_checkbox.innerHTML = `<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>`
        }
        if((angle > 200) && (toggle_pinless_checkbox == 1)){
            pinless_checkbox.innerHTML = `<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>`
        }
        if(toggle_pinless_checkbox == 0){
            op -= 3
            object1.style.top = `-${vl}px`
            object1.style.opacity = `${op}%`
        }
        if(toggle_pinless_checkbox == 1){
            op +=3
            object1.style.top = `-10px`
            object1.style.justifyContent = 'centre'
            object1.style.opacity = `${op}%`
            object1.style.alignItem = 'centre'
            document.querySelector("#pass svg").style.top = '4px'
            document.querySelector("#pass svg").style.left = '14px'
            document.querySelector("#password").style.left = '14px'

            
        }


        
        pinless_checkbox.style.transform = `rotate(${angle}deg)`

        if(angle == 360){
            toggle_pinless_checkbox = (toggle_pinless_checkbox + 1)%2
            if(toggle_pinless_checkbox == 1){
                object1.style.display = "none"
            }
            else{
                object1.style.display="block"
            }
            
        }

        if(angle!=360){
            requestAnimationFrame(animate_pinless_checkbox)
        }
    }
    requestAnimationFrame(animate_pinless_checkbox)
})

// Function animation: password {but user found}
function wrong_pass(svg_object,colorCode = '#8864df'){
    svg_object.style.color = 'red'
    start_time = performance.now()
    svg_object.style.position = 'relative'
    var wp_l = [-2,0,2,0]
    var wp_ptr = 1
    var wp_initial_val = svg_object.style.left
    function wp_start(timestamp){
        time_pass = timestamp - start_time
        if(click_or_not == 1){
            svg_object.style.left = (13+wp_l[wp_ptr]) + 'px'
        }
        else{
            svg_object.style.left = (5+wp_l[wp_ptr]) + 'px'
        }
        wp_ptr = (wp_ptr+1)%4

        if( (time_pass < 240) ){
            requestAnimationFrame(wp_start)
        }
        else if(wp_ptr != 1){
            requestAnimationFrame(wp_start)
        }
        else{
            svg_object.style.color = `${colorCode}`
        }
        
    }
    requestAnimationFrame(wp_start)
}

// function animation: animation circle{round round movement} ONLY
function animate_circle(object){
    var frames = ["animation_circle_frame1","animation_circle_frame2","animation_circle_frame3","animation_circle_frame4"]
    var ac_ptr = 0
    // controlling speed
    let lastTime = 0;
    const fps = 30; // Frames per second
    const frameDuration = 600 / fps; // Time per frame in milliseconds
    
    function ac_animate(time){
        requestAnimationFrame(ac_animate)
        const deltaTime = time - lastTime;
        if (deltaTime >= frameDuration){
            object.classList.toggle(frames[ac_ptr]);object.classList.toggle(frames[ac_ptr+1])
            ac_ptr = (ac_ptr+1)%3
        lastTime = time
        }
        
    }
    requestAnimationFrame(ac_animate)
}

// function animation: make box to circle (inc size by +10 as well) ONLY
function makeCircleBox(object,eB_ht,eB_wt){
    var p = 0
    var r = 0
    const htt = eB_ht
    const wtt = eB_wt
    // controlling speed
    let lastTime = 0;
    const fps = 30; // Frames per second
    const frameDuration = 0 / fps; // Time per frame in milliseconds

    function eB_animte(time){
        if((wtt-p) > (htt+10)){
            requestAnimationFrame(eB_animte)
        }
        else if(r < 51){
            requestAnimationFrame(eB_animte)
        }
        const deltaTime = time - lastTime;
        if (deltaTime >= frameDuration){

            if( p <= 10){
                object.style.height = (htt + p) + "px"
            }

            object.style.width = (wtt-p) + "px"
            object.style.borderRadius = r + "%"
            
            p += 1
            r+=1
            lastTime = time
        }
    }
    requestAnimationFrame(eB_animte)
}

//function animation: decrease size of any box (-10) ONLY
//  MAKE THE BOX TO NORMAL 
function shrinkBox(object,sB_ht,sB_wt,shrinkBy){
    var p = 0
    // controlling speed
    let lastTime = 0;
    const fps = 30; // Frames per second
    const frameDuration = 300 / fps; // Time per frame in milliseconds

    function sB_animate(time){
        if(p < shrinkBy){
            requestAnimationFrame(sB_animate)
        }
        const deltaTime = time - lastTime;
        if (deltaTime >= frameDuration){

            object.style.height = (sB_ht - p) + "px"
            object.style.width = (sB_wt - p) + "px"
            p += 1
            lastTime = time
        }

    }
    requestAnimationFrame(sB_animate)
}
//funciton animation: increases the size of the box 
function enlargeBox(object,sB_ht,sB_wt,shrinkBy){
    var p = 0
    // controlling speed
    let lastTime = 0;
    const fps = 30; // Frames per second
    const frameDuration = 300 / fps; // Time per frame in milliseconds

    function eB_animate(time){
        if(p < shrinkBy){
            requestAnimationFrame(eB_animate)
        }
        const deltaTime = time - lastTime;
        if (deltaTime >= frameDuration){

            object.style.height = (sB_ht + p) + "px"
            object.style.width = (sB_wt + p) + "px"
            p += 1
            lastTime = time
        }

    }
    requestAnimationFrame(eB_animate)
}

// function animation: blurs the specific element (up to 5px) ONLY
function makeItBlur(object){
    var bVal = 0
    // controlling speed
    let lastTime = 0;
    const fps = 30; // Frames per second
    const frameDuration = 1000 / fps; // Time per frame in milliseconds

    function mib_animate(time){
        if(bVal <= 5){
            requestAnimationFrame(mib_animate)
        }
        const deltaTime = time - lastTime;
        if (deltaTime >= frameDuration){
            object.style.filter = "blur(" + bVal + "px)"
            bVal += 1
            lastTime = time
        }
        
    }
    requestAnimationFrame(mib_animate)
}
// funciton animation: make it visible (opacity 0% --> 100%)
function makeItVisible(object){
    var v = 0;
    function miv_animate(){
        v += 5;
        if(v!=100){
            requestAnimationFrame(miv_animate);
        }
        object.style.opacity = v + "%"
    }
    requestAnimationFrame(miv_animate)
}



// animation of prompting the OTP
function prompt_OTP(){
    var p = 0;
    var v = 100;
    eles = document.querySelectorAll("#login_info *")
    function po_animate(time){
        if(v == 0){
            document.querySelector("#login_info").style.display = "none"
            document.querySelector(".otp_p").classList.toggle('hide')
            var allel = document.querySelectorAll(".otp_p *")
            for(var item = 0; item< allel.length; item ++){
                makeItVisible(allel[item])
            }
        }
        if(v != 0){
            requestAnimationFrame(po_animate);
        }
        for(var item=0;item<eles.length;item++){
            eles[item].style.opacity = v + "%"
            eles[item].style.left = "-" + p + "px"
        }
        v-=10;
        p+=10;
    }
    requestAnimationFrame(po_animate)
    
}
// function handle registaration form
function handle(){
    document.querySelector("#info").style.display = 'none'
    document.querySelector("#login_info").style.display = 'none'
    document.querySelector("#reg").style.display = 'flex'
}

// function {TIMER}
function StartTimer(object = document.querySelector(".timer")){
    object.innerHTML = "00:30"
    var initTime = 29;
    let ID = setInterval(() => {
        if(initTime <=9 ){
            object.innerHTML = "00:0" + initTime
        }
        else{
            object.innerHTML = "00:" + initTime
        }
        initTime -= 1
        if(initTime < 0){
            clearInterval(ID);
        }
    },1000)
}
//regTIMER
function RegTimer(object = document.querySelector(".Regtimer")){
    object.innerHTML = "00:30"
    var initTime = 29;
    let ID = setInterval(() => {
        if(initTime <=9 ){
            object.innerHTML = "00:0" + initTime
        }
        else{
            object.innerHTML = "00:" + initTime
        }
        initTime -= 1
        if(initTime < 0){
            clearInterval(ID);
        }
    },1000)
}

//

//
// function to redirect



// function to check wether the email address is valid or not
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Adding event to the Warning Box
var wB_Buttons = document.querySelectorAll(".Warning_Box button")
// Button NO
wB_Buttons[1].addEventListener("click", function(event){
    document.querySelector(".login_box").style.filter = "blur(0px)"
    document.querySelector(".Warning_Box").classList.toggle('hide')
})
//Button YES || this animates and brings the registration form
wB_Buttons[0].addEventListener("click",function(){
    document.querySelector(".login_box").style.filter = "blur(0px)"
    document.querySelector(".Warning_Box").classList.toggle('hide')
    handle()
})

//
let firstTime = 0;
// Adding event to SUBMIT button (PIN-less authentication)
document.querySelector(".otp_p button").addEventListener("click", async function(event){
    const otp = document.querySelector(".otp_p input").value;
    const loginStatus = await verifyOtp(mainUser.email, otp); // Wait for the OTP verification

    if (loginStatus === null) {
        console.log("not read yet");
    } else if (loginStatus === false) {
        document.querySelector(".mismatchOtp").classList.remove('hide');
        if (firstTime == 1) {
            wrong_pass(document.querySelector(".mismatchOtp"), 'red');
        }
        firstTime = 1;
    } else {
        if(mainUser.acAge == "new"){
            window.location.href = "./tag_list.html?user=" + encodeURIComponent(JSON.stringify(mainUser));
        }
        else{
            window.location.href = "./feed.html?user=" + encodeURIComponent(JSON.stringify(mainUser));
        }
    }
});

// Adding event to the "PASSWORD LOGO{register user}"
var ColLOGO = document.querySelectorAll("#reg img")
ColLOGO[0].addEventListener("click",function(){
    if(this.classList[0] == "show"){
        this.src = "./eye-fill.svg"
        document.querySelector("#p1").type = "text"
    }
    else{
        this.src = "./eye-slash-fill.svg"
        document.querySelector("#p1").type = "password"
    }
    this.classList.toggle("show")
})
ColLOGO[1].addEventListener("click",function(){
    if(this.classList[0] == "show"){
        this.src = "./eye-fill.svg"
        document.querySelector("#p2").type = "text"
    }
    else{
        this.src = "./eye-slash-fill.svg"
        document.querySelector("#p2").type = "password"
    }
    this.classList.toggle("show")
})

// Adding event to SUBMIT button{registration}
document.querySelector("#reg button").addEventListener("click",function(){
    var passEmail = 0 //false
    var passPass = 0
    var passName = 0
    var passPassLen = 0 //atleast 6

    var father = document.querySelector("#reg")
    if(!isValidEmail(document.querySelector("#rEmail input").value)){
        wrong_pass(document.querySelector("#rEmail"),'black')
        setTimeout(() =>{document.querySelector("#rEmail").style.left = '0px'},300)
        passEmail = 0
    }
    else{
        passEmail = 1
    }
    if(document.querySelector("#p1").value != document.querySelector("#p2").value){
        wrong_pass(document.querySelector("#rP"),'black')
        setTimeout(()=>{document.querySelector("#rP").style.left = '0px'},300)
        passPass = 0
        document.querySelector("#misPass").style.opacity = '100%'
        setTimeout(()=>{
            document.querySelector("#misPass").style.opacity = '0%'
        },3000)
    }
    else{
        passPass= 1
    }
    // checking name
    if(document.querySelector("#rName input").value.length >=2 ){
        passName = 1
    }
    else{
        wrong_pass(document.querySelector("#rName"),'black')
        setTimeout(()=>{document.querySelector("#rName").style.left = '0px'},300)
        passName = 0
        document.querySelector("#misName").style.opacity = '100%'
        setTimeout(()=>{
            document.querySelector("#misName").style.opacity = '0%'
        },3000)
    }
    // checking pass len
    if(document.querySelector("#p1").value.length < 6){
        wrong_pass(document.querySelector("#rP"),'black')
        setTimeout(()=>{document.querySelector("#rP").style.left = '0px'},300)
        passPassLen = 0
        document.querySelector("#misPassLen").style.opacity = '100%'
        setTimeout(()=>{
            document.querySelector("#misPassLen").style.opacity = '0%'
        },3000)
    }
    else{
        passPassLen = 1
    }


    if(passEmail && passPass && passPassLen && passName){
        mainUser = userData.find(item => item.email === document.querySelector("#rEmail input").value)
        if(mainUser){
            alert("User already exists")
        }
        else{
            var storedMail = document.querySelector("#rEmail input").value
            storeEM = storedMail
            storePass = document.querySelector("#p1").value
            storeName = document.querySelector("#rName input").value
            console.log("her")
            console.log(storeName)
            console.log(storeEM)
            console.log(storePass)
            var l = 0
            var v = 100
            var colReg = document.querySelectorAll("#reg > *")
            var startTime = performance.now()
            var flagOTP = 0;
            function animate_reg(timestamp){
                if( (timestamp-startTime) < 500){
                    requestAnimationFrame(animate_reg)
                }
                if((timestamp-startTime) < 300){
                    for(var ii=0;ii<(colReg.length-3);ii++){
                        colReg[ii].style.left = "-" + l + "px"
                        colReg[ii].style.opacity = v + "%"
                    }
                    l += 8
                    v -= 20
                }
                else{
                    document.querySelector("#reg").style.display = 'none'
                    document.querySelector('#regOTP').style.display = 'flex'
                    for(var item=0;item<document.querySelectorAll("#regOTP > *").length;item++){
                        makeItVisible(document.querySelectorAll("#regOTP > *")[item])
                    }
                    if(flagOTP == 0){
                        sendOtp(storedMail)
                        flagOTP = 1
                    }
                    RegTimer()
                }
            }
            requestAnimationFrame(animate_reg)
        }
    }
    else{
        console.log(passName)
        console.log(passEmail)
        console.log(passPass)
        console.log(passPassLen)
    }
})

//----------------- Adding event to buttons of OTP SUBMISSION (registration)
// submit
let firstTimee = 0;
// Adding event to SUBMIT button (registration)
document.querySelector("#regOTP button").addEventListener("click", async function(event,em = storeEM){
    const otp = document.querySelector("#regOTP input").value;
    const loginStatus = await verifyOtp(em, otp); // Wait for the OTP verification

    if (loginStatus === null) {
        console.log("not read yet");
    } else if (loginStatus === false) {
        document.querySelector("#regOTP .mismatchOtp").classList.remove('hide');
        if (firstTimee == 1) {
            wrong_pass(document.querySelector("#regOTP .mismatchOtp"), 'red');
        }
        firstTimee = 1;
        setTimeout(()=>{document.querySelector("#regOTP .mismatchOtp").classList.add('hide')},2000)
    } else {
        addUser(storeEM,storePass,storeName,[],[],[],[],0,"new")
        alert("succes: login using your creditants ")
        window.location.reload(true);
    }
});

// Adding event to the RESEND button {registration}
document.querySelector("#regOTP .resend").addEventListener("click",function(){
    document.querySelector("#regOTP .mismatchOtp").classList.add('hide')
    firstTimee = 0
    var timerObj = document.querySelector(".Regtimer")
    if(timerObj.innerHTML != "00:00"){
        wrong_pass(document.querySelector(".Regtimer"),'black')
    }
    else{
        RegTimer()
        sendOtp(storeEM)
    }
})

// Adding event to RESEND button {PIN less authentication}
document.querySelector(".resend").addEventListener("click",function(){
    document.querySelector(".mismatchOtp").classList.add('hide')
    firstTime = 0
    var timerObj = document.querySelector(".timer")
    if(timerObj.innerHTML != "00:00"){
        wrong_pass(document.querySelector(".timer"),'black')
    }
    else{
        StartTimer()
        sendOtp(mainUser.email)
    }
})

// Adding event to the "REGISTER BUTTON"
document.querySelector(".register").addEventListener("click",function(){
    handle()
})

// Adding event to LOGIN button : 
 document.querySelector(".button").addEventListener("click",function(){
    shrinkBox(this,30,120,5)
    setTimeout(enlargeBox(this,26,116,5),800)
    // checking of crediantials 
    var userEmail = document.querySelector("#username").value
    if(isValidEmail(userEmail)){
        mainUser = userData.find(item => item.email === userEmail)
        if(mainUser){
            if(toggle_pinless_checkbox == 1){
                sendOtp(mainUser.email)
                prompt_OTP()
                StartTimer()
            }
            else if(mainUser.password == document.querySelector("#password").value){
                if(mainUser.acAge == "new"){
                    window.location.href = "./tag_list.html?user=" + encodeURIComponent(JSON.stringify(mainUser));
                }
                else{
                    window.location.href = "./feed.html?user=" + encodeURIComponent(JSON.stringify(mainUser));
                }
            }
            else{
                wrong_pass(document.querySelector("#pass svg"))
            }
        }
        else{
            makeItBlur(document.querySelector(".login_box"))
            document.querySelector(".Warning_Box").classList.toggle('hide')
        }
    }
    else{
        wrong_pass(document.querySelector(".user_detail svg")) //invalid Email address
    }
 })

 // adding event to the CREATE NEW ACCOUNT button
 document.querySelector(".register").addEventListener("click",function(){
    this.style.color = "white"
    setTimeout(() => {this.style.color = "#8864df"},100)
    // From here use that function that create a new user and registration form
 })


    
    

    // animation part ---
    // if(canHandle == 0){
    //     return;
    // }
    // canHandle = 0
    // this.style.filter = "blur(0px)"
    // var all_el = document.querySelectorAll("#login_info *")
    // for(var i=0;i<all_el.length;i++){
    //     if(all_el[i] != this) {
    //         if(all_el[i] != this.lastElementChild){
    //             makeItBlur(all_el[i])
    //         }
    //     }
    
    // }
    // makeCircleBox(this,30,120)
    // this.firstElementChild.classList.add("button_unactive")
    // this.lastElementChild.classList.remove("button_unactive")

    //animate_circle(this.lastElementChild)
    
    //shrinkBox(this,40,130) 
    // add above line if Search of user is successfull 



// --------------------------------------------------------- BACKEND WORK---------------------------------------------------------------











