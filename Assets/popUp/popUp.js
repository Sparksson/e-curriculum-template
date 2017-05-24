function popUp(URL,W,H) {
    //day = new Date();
    //id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width="+W+",height="+H+",left = 0,top = 0');");
}