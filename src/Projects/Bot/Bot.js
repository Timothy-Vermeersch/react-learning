import React from 'react';
import "./Bot.css";
import example_image_one from "./Images/example-one.jpg";
import example_image_two from "./Images/example-two.jpg";
import example_image_three from "./Images/example-three.jpg";

const Bot = () => {
    return(
        <div className = "Project-Container">
            <h1 id = "Project-Title">Instagram Bot</h1>
            <hr/>
            <h2 id = "Project-Subtitle">Introduction</h2>
            <div id = "Project-Introduction">
                <p>
                    This page will work throught the details of the Instagram Bot Project I have worked on. I started working on this 
                    project in order to get more familiar with Python. I felt it important to learn more about Python because I 
                    learned Python in middle school but never had a project that required. The project was also my first time using 
                    the Selenium framework. Selenium makes allows interaction with web browsers through the pages html elements. I used
                    this feature to create a program that acts as an Instragam user. The program will find a post, download the image,
                    and repost with its own caption and relevant hashtags. The program can also follow people who it believes would be
                    interested in its content and can choose to unfollow them at a later time.
                </p>
                <br/>
            </div>
            <hr/>
            <h2 id = "Project-Subtitle">Features</h2>
            <div id = "Project-Features">
                <p>
                    The bare minimum for the program to emulate a page it would have to be able to login, find posts, download them, and 
                    post. While these basic function are the core of the project, with just these there would be a very low 
                    oppurtunities for follower interaction and growth. This is why the program also includes such features as relevant 
                    following and delayed unfollowing. The basic function will be outlined  first, then the functions geared towards 
                    growth and post quality. There are other helper functions but they will not be covered since they don't effect 
                    functionality. 
                </p>
                <br/>
                <hr/>
                <h2 id = "Project-Subtitle">Basic Functions</h2>
                <table id = "Basic-Functions">
                    <tr>
                        <th>Name</th>
                        <th>Paramaters</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>__init__</td>
                        <td>self, search_hashtags, username, password, comments = [""]</td>
                        <td>The initalizer for the Bot class.</td>
                    </tr>
                    <tr>
                        <td>login</td>
                        <td>self</td>
                        <td>Navigates to instagram.com, enters the data given in the initalizer, and logs in. </td>
                    </tr>
                    <tr>
                        <td>logout</td>
                        <td>self</td>
                        <td>Will navigate to the settings tab and hit logout.</td>
                    </tr>
                    <tr>
                        <td>search</td>
                        <td>self, search_value, download_image, file_name</td>
                        <td>Takes the search-value and enters into the Instagram search bar. If download_image is set to true a 
                            post will be selected from trending. The file given in parameters will be used to check if this image has
                            already been used. If so it will select another post, if not it will download the image into the directory
                            from which the function is called.
                        </td>
                    </tr>
                    <tr>
                        <td>post</td>
                        <td>self, file_path</td>
                        <td>Inserts an event listener into the Instagram page allowing for post to made by passing a file path.
                            The file is then passed to the web page and posted. 
                        </td>
                    </tr>
                </table>
                <hr/>
                <h2 id = "Project-Subtitle">Growth Functions</h2>
                <table id = "Basic-Functions">
                    <tr>
                        <th>Name</th>
                        <th>Paramaters</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>follow_from_page</td>
                        <td>self, page_name, how_many_to_follow, file_name</td>
                        <td>Navigates to the page given in the parameters. Follows followers from that page equal to the amount 
                            suggested in the parameters. Each page followed is added to the file given in the parameters in order 
                            to be unfollowed at a later time.
                        </td>
                    </tr>
                    <tr>
                        <td>unfollow_from_txt</td>
                        <td>self, how_many_to_unfollow, file_name</td>
                        <td>From the file that was populated by follow_from_page accounts are unfollowed in queue order to ensure that
                            the user that has been followed the longest is unfollowed first. It is done in this order so these users
                            are less likely to notice that they have been unfollowed.
                        </td>
                    </tr>
                </table>
            </div>
            <hr/>
            <h2 id = "Project-Subtitle">How It's Used</h2>
            <p>This section is gonna be explaining how to use the Bot class to emulate a page. There would be many ways to do this but
                the one that I used will be the one explained. This method begins with defining a .py file that defines what you would
                like the page to do. Then this file must be turned into an exectuable. I choose to create a .bat file, but there are 
                many ways to do this. The final step is to schedule these exectuables are various times. This step depends heavily on
                your hardware available. The best option would be to run this on a remote server so it doesn't effect your workflow on 
                your PC. A more cost effective method that has a minimal impact on your productivity would be to use Task Schedular if
                on Windows, or crontab or Calender scheduling for Mac OS. Each of these options have pros and cons that we won't get into.  
            </p>
            <hr/>
            <h2 id = "Project-Subtitle">.py File Set Up</h2>
            <p>The following is a generic example showing how to set up the py file. This example sets up two different bots,
                and has each of them make a post.
            </p>
            <img id = "Example-Image" src = {example_image_one}/>
            <p>The next example is similiar to the previous. This file would create two bot instances, following new users from a page
                relevant to their content. Then unfollow some based on if the desired threshold is passed.
            </p>
            <img id = "Example-Image" src = {example_image_two}/>
            <hr/>
            <h2 id = "Project-Subtitle">.bat File Set Up</h2>
            <p>The .bat set up is very easy. First open Notepad and in quotations give the path to python.exe for your system. Then give
                the path to your .py file in quotations. Save as a .bat file and this step is done. Use the example below as a guide. 
            </p>
            <img id = "Example-Image" src = {example_image_three}/>
        </div>
    )
}

export default Bot;