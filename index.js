const log = console.log;

let app = new PIXI.Application({
    width: window.innerWidth - 30,
    height: window.innerHeight - 30,
    transparent: true,
    antialias: true,
    autoresize: true
    });

document.body.appendChild(app.view);

let contentViewer = new PIXI.Container();

    let contentViewerBg = new PIXI.Graphics()
        .beginFill(0xe6f7ff)
        .drawRect(0, 0, app.view.width, app.view.height);


    contentViewer.addChild(contentViewerBg);

app.stage.addChild(contentViewer);

let tree = CreateTree(root, heads);

tree.y = 20;// to do, hardcoded  for now(if needed)

contentViewer.addChild(tree);