let standartGap = 6;
function SetDepartmentScreen(dept){
        
    let departmentPage = new PIXI.Container();
    
    departmentPage.name = dept;
        
    CreateHeader(departmentPage);
    
    CreateManagerCards(departmentPage, heads, deputies);
    
    CreateTeamViewArea(departmentPage);
    
    //departmentPage.addChild(header)
    
  // let teamViewer = SetTeamsViewer();
    
    //ComposeDepartmentScreen(dept, departmentPage, teamViewer);
    
   // departmentPage.addChild(teamViewer);
          
    contentViewer.addChild(departmentPage);
    
}

function CreateHeader(page){
    
    let headerBarContainer = new PIXI.Container();
    
    let headerBg = new PIXI.Graphics()
        .beginFill(0x000033)
        .drawRect(0, 0, app.stage.width, 50);
    headerBarContainer.addChild(headerBg);
    
    let headerText = new PIXI.Text(page.name, {
        fontFamily: 'SquareFont',
        fill: 0xffffff,
        fontSize: 32
    });
    
    SetElementPosition(headerText, headerBg, 'x', 'y');
    
    CreateBackButton(page, headerBarContainer);
    
    headerBarContainer.addChild(headerText);
    
    headerBarContainer.name = 'Header';
    
    page.addChild(headerBarContainer);
}

function CreateBackButton(page, container){
    
    let backButton = new PIXI.Container();
    
    let text = new PIXI.Text('Back', {
        fontFamily: 'SquareFont',
        fill: 0xffffff,
    });
    
    let backBg = new PIXI.Graphics()
        .beginFill(0x000077)
        .lineStyle(2, 0xffffff, 2)
        .drawRect(0, 0, text.width + 10, text.height);
    
    SetElementPosition(text, backBg, 'x');
    backButton.addChild(backBg, text);
    
    SetElementPosition(backButton, container, 20, 'y');
       
    backButton.interactive = true;
    backButton.click = () => {
        tree.visible = true;
        contentViewer.removeChild(page);
    }
    
    backButton.mouseover = function(mouseData){
        this.alpha += 8;        
    }
                           
    backButton.mouseout = function(mouseData){
        this.alpha -= 8;
    }
    
    container.addChild(backButton);
    
}



function CreateTeamViewArea(page){
    
    let cards = page.getChildByName('Managers');
    
    let bg = new PIXI.Graphics()
        .beginFill(0x000055)
        .drawRect(0, cards.y + cards.height + standartGap, contentViewer.width, 500);
    page.addChild(bg);
    bg.name = 'TeamHolder';
}

function ComposeDepartmentScreen(deptartment, page, header, viewer){
    
    let head = SetDepartmentManagers(deptartment, heads);
        
    let deputy = SetDepartmentManagers(deptartment, deputies);
    
    teamsPositionHeight = head.y + head.height+ 20;
    
    if (deputy != undefined){
        
        DeptManagersPositon(header, head, deputy);
        
        page.addChild(head, deputy);
        
    } else {
        
        DeptManagersPositon(header, head);
        
        page.addChild(head);
   
    }
        //to do
    //let teams = SetDepartmentTeams(department);
    //container.addChild(head, deputy);
   // SetToMid(container, contentViewer);
    
}

function CreateManagerCards(department, heads, deputies) {
    
    let managerList = [];
    
    //repetition
    let head = heads.find(function(Person) {
        return Person.position.includes(department.name);
    });
    
    let deputy = deputies.find(function(Person) {
        return Person.position.includes(department.name);
    });
    
    managerList.push(head, deputy);
    
     let managers = new PIXI.Container();
    managers.name = 'Managers';
    
    let yPosition = department.getChildByName('Header').height + standartGap;
    
    let headItem = SetupItem(managerList[0], 250, 250, 14);
         
    managers.addChild(headItem);
         
    if (managerList[1] != undefined) {
        let gap = 6;
        deputyItem = SetupItem(managerList[1], 250, 250, 14);
        deputyItem.x = headItem.x + headItem.width + gap;
        
        managers.addChild(deputyItem);
    }
    
    SetElementPosition(managers, contentViewer, 'x', yPosition);
    
    department.addChild(managers);
}