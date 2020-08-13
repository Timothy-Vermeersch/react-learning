import React from 'react';
import ProjectTab from './ProjectTab';

function ProjectList(){
    return(
        <div id = "Project-List">
            <ProjectTab name = "Automated Instagram Bot" src = "BotTab.jpg" description = "An Instagram bot written in Python using the Selenium library. This bot automatically runs a page doing such things as finding content, posting, following and unfollowing users." path = "Bot"/>
        </div>
    );
}

export default ProjectList;