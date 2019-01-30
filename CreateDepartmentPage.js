let standartGap = 6;

function SetDepartmentScreen(dept){
    
    let header, managers, teamsViewArea;
    
    let departmentPage = new PIXI.Container();
    departmentPage.name = dept;
        
    header = CreateHeader(departmentPage);

    managers = CreateManagerCards(departmentPage, heads, deputies);
    
    teamsViewArea = CreateTeamViewArea();
    
    teamButtons = CreateTeamButtons(dept, teamsViewArea);
    
    AssembleScreen(header, managers, teamsViewArea);
    
    departmentPage.addChild(header, teamsViewArea, managers);
          
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
    
    return headerBarContainer;
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

function CreateTeamViewArea(){

    let bg = new PIXI.Graphics()
        .beginFill(0x000055)
        .drawRect(0, 0, contentViewer.width, 500);
    
    return bg;
}

function CreateManagerCards(department, heads, deputies) {
    
    let managers = new PIXI.Container();
    managers.name = 'Managers';
    
    let managerList = [];
    
    //repetition
    let head = heads.find(function(Person) {
        return Person.position.includes(department.name);
    });
    
    let deputy = deputies.find(function(Person) {
        return Person.position.includes(department.name);
    });
    
    managerList.push(head, deputy);
    
    let headItem = SetupItem(managerList[0], 250, 250, 14);
         
    managers.addChild(headItem);
         
    if (managerList[1] != undefined) {
        deputyItem = SetupItem(managerList[1], 250, 250, 14);
        deputyItem.x = headItem.x + headItem.width + standartGap;
        
        managers.addChild(deputyItem);
    }
    
    return managers;
}

function CreateTeamButtons(department, view) {
    let buttons = new PIXI.Container();
    let fakedept = [1,2,3];
    for (let i = 0; i < fakedept.length; i++){
        let button = new PIXI.Container();
        let bg = new PIXI.Graphics()
            .beginFill(0x770000)
            .drawRect(0, 0, 50, 50);
        button.addChild(bg);
        let txt = new PIXI.Text(fakedept[i]);
        button.addChild(txt);
        button.interactive = true;
        button.x = (50 + standartGap) * i;
        
        button.click = () => {
            log(department, fakedept[i]);
        }
        buttons.addChild(button);
    }
    
    view.addChild(buttons);
    
    buttons.x = (view.width - buttons.width) * 0.5;
    buttons.y = standartGap;
    
}

function AssembleScreen(header, managers, teamView){
    managers.y = header.y + header.height + standartGap;
    SetElementPosition(managers, header, 'x');
    teamView.y = managers.y + managers.height + standartGap;
}