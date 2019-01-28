//Create tree----------------------------------------------------------

function CreateTree(Root, Branches) {
   
    let tree = new PIXI.Container();
    
    let defaultFontSize = 14
    
    let rootWidth = contentViewer.width / 4.165; //contentv divided by ~250;
    let rootHeight = contentViewer.height / 3.836;
   
    let ceo = SetupItem(Root, rootWidth, rootHeight, defaultFontSize);
    
    let offset = 5;
    
    let departments = SetupDepartments(Branches, offset);
    
    departments.name = 'Branches';
    
    tree.addChild(ceo, departments);
    
    let verticalRootBranchesDistance = 500;
    
    Positioning(tree, verticalRootBranchesDistance);
    DrawLines(tree, offset);
    
    return tree;    
}


function SetupItem(person, width, height, fontsize) {
    
    let container = new PIXI.Container();
    
    container.name = person.position;
    
    SetBackground(container, width, height);
    
    GetPicture(person, container);
    
    GetText(person, container, fontsize);
    
    return container;
    
}

function SetBackground(item, width, height) {
    let background = new PIXI.Graphics()
        .beginFill(0x000033)
        .drawRoundedRect(0, 0, width, height, 10);
    item.addChild(background);    
}

function GetPicture(source, item) {
    // let pic = new PIXI.Sprite.fromImage(source); will not load now, confluence security crap
    let verticalOffset = 5;
    
    let texture = new PIXI.Texture.fromImage("./source/lion.jpeg");

    let pic = new PIXI.Sprite(texture);
    
    pic.anchor.x = 0.5;
    
    let dimensions;
    
    if (item.width <= item.height) {
            dimensions = item.width * 0.5;
        }
    else if (item.width > item.height) {
            dimensions = item.height * 0.5;
        }
    
    pic.width = dimensions;
    pic.height = dimensions;
    
    pic.x = item.width * 0.5;
    pic.y = verticalOffset;
    pic.name = 'pic';
        
    item.addChild(pic);
   
}

function GetText(source, item, fontsize) {
    let textContainer = new PIXI.Container();
    
    let nextFieldPosition = 0;
    
    
    for (let field in source) {    
        
        if (field === 'pic')
        
        {
            continue;            
        }
        
        else if (field === 'slack') 
            
        {
            let text = new PIXI.Text('Slack... CLICK ME!', {
                fontFamily: 'SquareFont',
                fontSize: fontsize,
                fill: 0xFFFFFF,
                wordWrap: true,
                wordWrapWidth: item.width,
                align: 'center'
            });
            text.interactive = true;
            text.click = () => window.open(source.slack);
            text.x = item.width * 0.5;
            text.pivot.x = text.width * 0.5;
            text.y = nextFieldPosition;
            nextFieldPosition += text.height;
            textContainer.addChild(text);        
        } 
        
        else 
        
        {

            text = new PIXI.Text(source[field], {
                fontFamily: 'SquareFont',
                fontSize: fontsize,
                fill: 0xFFFFFF,
                wordWrap: true,
                wordWrapWidth: item.width,
                align: 'center'
            });
        
            text.x = item.width * 0.5;
            text.pivot.x = text.width * 0.5;
            text.y = nextFieldPosition;
            nextFieldPosition += text.height;
            textContainer.addChild(text);
        }
    }
    
    
    textContainer.y = item.getChildByName('pic').y + item.getChildByName('pic').height + 5;
    
    item.addChild(textContainer);
}

function GetDepartmentName(string, container) {
    
    let department = string.slice(8);

    let text = new PIXI.Text(department, {
            fontFamily: 'SquareFont',
            fontSize: 14,
            fill: 0xffffff,
            wordWrap: true,
            wordWrapWidth: container.width - 10,
            align: 'center'
        });
    
    SetElementPosition(text, container, 'x', 'y');
    
    return text;
}

function SetElementPosition(item, whereToSet, axisX, axisY) {
    
    if (axisX === 'x'){
        item.x = (whereToSet.width - item.width) * 0.5;
    }
    else if (!isNaN(axisX)){
        item.x = axisX;
    }
    
    if (axisY === 'y'){
         item.y = (whereToSet.height - item.height) * 0.5;
    }
   
    //log(item.x, item.y);
}

function SetupDepartments(items, offset) {
    
    let container = new PIXI.Container();

    for (let i = 0; i < items.length; i++){

        let branchItem = new PIXI.Container();

        let maxWidth = app.view.width / items.length - offset * 2;

        SetBackground(branchItem, maxWidth, 100);
        
        let departmentName = GetDepartmentName(items[i].position, branchItem);
        
        branchItem.addChild(departmentName);
        branchItem.name = departmentName._text;
        branchItem.interactive = true;
         
        branchItem.click = () => {            
            GoToDepartmentPage(branchItem.name);
        }
        
        container.addChild(branchItem);

    }    
    
    return container;
}

function GoToDepartmentPage(department){
    tree.visible = false;    
    SetDepartmentScreen(department);
}
