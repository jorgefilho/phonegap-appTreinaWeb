Ext.applicatio1n({
	name:'phonegap',
	
	proxy:["Contato"],
	models:["Contatos"],
	stores:["Contatos"],
	controllers:["ListContato"],
	views:["Viewport",
	       "contato.Lista",
	       "contato.Editor",
	       "contato.Form",
	       "toolbars.Top",
	       "toolbars.TopBack",
	       "toolbars.TopAdd",
	       "toolbars.Botton",
	       "toolbars.BottonForm",
	       ],
	
	       
	       lauch:function(){
	    	   var viewPort = Ext.create('phonegap.view.contato.Lista');
	    	   Ext.ViewPort.add(viewPort);
	       }
});