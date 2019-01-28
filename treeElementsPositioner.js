function Positioning(tree, verticalDistance){
    let root = tree.getChildByName('CEO');
    root.x = (contentViewer.width - root.width) / 2;
    
    
    let branches = tree.getChildByName('Branches');    
    
    let branchesNumber = branches.children.length;
    let width = contentViewer.width;
    
    for (let i = 0; i < branchesNumber; i++){
        branches.getChildAt(i).x = width/branchesNumber * i
        branches.getChildAt(i).y = verticalDistance;
    }
    
    branches.x = (contentViewer.width - branches.width) / 2;
}