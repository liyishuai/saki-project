/**
 * 该文件为GameCreator编辑器自动生成的代码，请勿修改
 */

/**
 * 1-标题界面 [BASE]
 */
class GUI_1 extends GUI_BASE {
   界面背景:UIBitmap;
   装饰斜边:UIBitmap;
   分割线:UIBitmap;
   装饰图标:UIBitmap;
   游戏标题:UIString;
   GameCreator标志:UIString;
   StartBtn:UIButton;
   LoadBtn:UIButton;
   QuitBtn:UIButton;
   SettingBtn:UIButton;
   AlbumBtn:UIButton;
   constructor(){
      super(1);
   }
}
class ListItem_1 extends UIListItemData {
   界面背景:string;
   装饰斜边:string;
   分割线:string;
   装饰图标:string;
   游戏标题:string;
   GameCreator标志:string;

}

/**
 * 2-读档界面 [BASE]
 */
class GUI_2 extends GUI_BASE {
   界面背景:UIBitmap;
   界面标志:UIBitmap;
   界面背景框:UIBitmap;
   list:UIList; // Item=1001
   关闭读取存档界面按钮:UIButton;
   图片:UIBitmap;
   constructor(){
      super(2);
   }
}
class ListItem_2 extends UIListItemData {
   界面背景:string;
   界面标志:string;
   界面背景框:string;
   list:UIListItemData[];
   图片:string;
}

/**
 * 3-对话菜单 [BASE]
 */
class GUI_3 extends GUI_BASE {
   历史回忆界面按钮:UIButton;
   自动播放按钮:UISwitch;
   快进按钮:UISwitch;
   存档界面按钮:UIButton;
   读档界面按钮:UIButton;
   设置界面按钮:UIButton;
   返回标题界面按钮:UIButton;
   提示文本:UIString;
   constructor(){
      super(3);
   }
}
class ListItem_3 extends UIListItemData {
   自动播放按钮:number;
   快进按钮:number;
   提示文本:string;
}

/**
 * 4-历史回忆 [BASE]
 */
class GUI_4 extends GUI_BASE {
   界面背景:UIBitmap;
   界面标志:UIBitmap;
   文本框背景:UIBitmap;
   dialogRecordList:UIList; // Item=1002
   返回按钮:UIButton;
   图片:UIBitmap;
   constructor(){
      super(4);
   }
}
class ListItem_4 extends UIListItemData {
   界面背景:string;
   界面标志:string;
   文本框背景:string;
   dialogRecordList:UIListItemData[];
   图片:string;
}

/**
 * 5-存档界面 [BASE]
 */
class GUI_5 extends GUI_BASE {
   界面背景:UIBitmap;
   界面标志:UIBitmap;
   界面背景框:UIBitmap;
   list:UIList; // Item=1001
   关闭存入存档界面按钮:UIButton;
   图片:UIBitmap;
   constructor(){
      super(5);
   }
}
class ListItem_5 extends UIListItemData {
   界面背景:string;
   界面标志:string;
   界面背景框:string;
   list:UIListItemData[];
   图片:string;
}

/**
 * 6-系统设置 [BASE]
 */
class GUI_6 extends GUI_BASE {
   界面背景:UIBitmap;
   界面中层背景:UIBitmap;
   界面标志:UIBitmap;
   背景音乐音量滑块背景:UIBitmap;
   背景音乐音量文本:UIString;
   环境音效音量滑块背景:UIBitmap;
   环境音效音量文本:UIString;
   音效音量滑块背景:UIBitmap;
   音效音量文本:UIString;
   语音音量滑块背景:UIBitmap;
   语音音量文本:UIString;
   bgmSlider:UISlider;
   bgsSlider:UISlider;
   seSlider:UISlider;
   tsSlider:UISlider;
   关闭系统设置界面按钮:UIButton;
   全屏勾选框:UISwitch;
   全屏文本:UIString;
   快进已读勾选框:UISwitch;
   快进已读文本:UIString;
   图片:UIBitmap;
   分割线1:UIBitmap;
   分割线2:UIBitmap;
   分割线3:UIBitmap;
   分割线4:UIBitmap;
   分割线5:UIBitmap;
   constructor(){
      super(6);
   }
}
class ListItem_6 extends UIListItemData {
   界面背景:string;
   界面中层背景:string;
   界面标志:string;
   背景音乐音量滑块背景:string;
   背景音乐音量文本:string;
   环境音效音量滑块背景:string;
   环境音效音量文本:string;
   音效音量滑块背景:string;
   音效音量文本:string;
   语音音量滑块背景:string;
   语音音量文本:string;
   bgmSlider:number;
   bgsSlider:number;
   seSlider:number;
   tsSlider:number;
   全屏勾选框:number;
   全屏文本:string;
   快进已读勾选框:number;
   快进已读文本:string;
   图片:string;
   分割线1:string;
   分割线2:string;
   分割线3:string;
   分割线4:string;
   分割线5:string;
}

/**
 * 7-文本输入界面 [BASE]
 */
class GUI_7 extends GUI_BASE {
   界面背景:UIBitmap;
   输入框背景:UIBitmap;
   input:UIInput;
   提交文本输入按钮:UIButton;
   constructor(){
      super(7);
   }
}
class ListItem_7 extends UIListItemData {
   界面背景:string;
   输入框背景:string;
   input:string;

}

/**
 * 8-数字输入界面 [BASE]
 */
class GUI_8 extends GUI_BASE {
   界面背景:UIBitmap;
   输入框背景:UIBitmap;
   input:UIInput;
   提交数字输入按钮:UIButton;
   constructor(){
      super(8);
   }
}
class ListItem_8 extends UIListItemData {
   界面背景:string;
   输入框背景:string;
   input:string;

}

/**
 * 9-密码输入界面 [BASE]
 */
class GUI_9 extends GUI_BASE {
   界面背景:UIBitmap;
   输入框背景:UIBitmap;
   input:UIInput;
   提交密码输入按钮:UIButton;
   constructor(){
      super(9);
   }
}
class ListItem_9 extends UIListItemData {
   界面背景:string;
   输入框背景:string;
   input:string;

}

/**
 * 10-游戏结束界面 [BASE]
 */
class GUI_10 extends GUI_BASE {
   界面背景:UIBitmap;
   GameOver文本:UIString;
   constructor(){
      super(10);
   }
}
class ListItem_10 extends UIListItemData {
   界面背景:string;
   GameOver文本:string;
}

/**
 * 11-CG鉴赏 [BASE]
 */
class GUI_11 extends GUI_BASE {
   界面背景:UIBitmap;
   鉴赏框背景:UIBitmap;
   界面标志:UIBitmap;
   cgList:UIList; // Item=1003
   关闭CG鉴赏界面按钮:UIButton;
   图片:UIBitmap;
   constructor(){
      super(11);
   }
}
class ListItem_11 extends UIListItemData {
   界面背景:string;
   鉴赏框背景:string;
   界面标志:string;
   cgList:UIListItemData[];
   图片:string;
}

/**
 * 12-CG鉴赏大图 [BASE]
 */
class GUI_12 extends GUI_BASE {
   界面背景:UIBitmap;
   bigCG:UIBitmap;
   关闭鉴赏大图按钮:UIButton;
   constructor(){
      super(12);
   }
}
class ListItem_12 extends UIListItemData {
   界面背景:string;
   bigCG:string;

}

/**
 * 13-提示框 [BASE]
 */
class GUI_13 extends GUI_BASE {
   透明背景:UIBitmap;
   界面背景:UIBitmap;
   提示框标题文本:UIString;
   提示框内容文本:UIString;
   确定按钮:UIButton;
   取消按钮:UIButton;
   constructor(){
      super(13);
   }
}
class ListItem_13 extends UIListItemData {
   透明背景:string;
   界面背景:string;
   提示框标题文本:string;
   提示框内容文本:string;

}

/**
 * 14-题目选项框 [BASE]
 */
class GUI_14 extends GUI_BASE {
   列表:UIList; // Item=15
   constructor(){
      super(14);
   }
}
class ListItem_14 extends UIListItemData {
   列表:UIListItemData[];
}

/**
 * 15-选项按钮 [BASE]
 */
class GUI_15 extends GUI_BASE {
   选项按钮:UIButton;
   constructor(){
      super(15);
   }
}
class ListItem_15 extends UIListItemData {

}

/**
 * 1001-档案Item [BASE]
 */
class GUI_1001 extends GUI_BASE {
   档案背景:UIBitmap;
   screenshotImg:UIBitmap;
   sceneName:UIString;
   dateStr:UIString;
   no:UIString;
   delBtn:UIButton;
   gameTimeStr:UIString;
   图片:UIBitmap;
   constructor(){
      super(1001);
   }
}
class ListItem_1001 extends UIListItemData {
   档案背景:string;
   screenshotImg:string;
   sceneName:string;
   dateStr:string;
   no:string;
   gameTimeStr:string;
   图片:string;
}

/**
 * 1002-历史回忆Item [BASE]
 */
class GUI_1002 extends GUI_BASE {
   tsBtn:UIButton;
   dialogName:UIString;
   dialogContent:UIString;
   constructor(){
      super(1002);
   }
}
class ListItem_1002 extends UIListItemData {
   dialogName:string;
   dialogContent:string;
}

/**
 * 1003-图片鉴赏Item [BASE]
 */
class GUI_1003 extends GUI_BASE {
   cg:UIBitmap;
   constructor(){
      super(1003);
   }
}
class ListItem_1003 extends UIListItemData {
   cg:string;
}

/**
 * 1004- [BASE]
 */
class GUI_1004 extends GUI_BASE {

   constructor(){
      super(1004);
   }
}
class ListItem_1004 extends UIListItemData {

}

/**
 * 1005- [BASE]
 */
class GUI_1005 extends GUI_BASE {

   constructor(){
      super(1005);
   }
}
class ListItem_1005 extends UIListItemData {

}

/**
 * 2001-启动载入界面 [BASE]
 */
class GUI_2001 extends GUI_BASE {
   loadingComp:UISlider;
   加载动画:UIAnimation;
   constructor(){
      super(2001);
   }
}
class ListItem_2001 extends UIListItemData {
   loadingComp:number;
   加载动画:number;
}

/**
 * 2002-新游戏载入界面 [BASE]
 */
class GUI_2002 extends GUI_BASE {
   界面背景:UIBitmap;
   加载动画:UIAnimation;
   constructor(){
      super(2002);
   }
}
class ListItem_2002 extends UIListItemData {
   界面背景:string;
   加载动画:number;
}

/**
 * 2003-读档载入界面 [BASE]
 */
class GUI_2003 extends GUI_BASE {
   界面背景:UIBitmap;
   加载动画:UIAnimation;
   constructor(){
      super(2003);
   }
}
class ListItem_2003 extends UIListItemData {
   界面背景:string;
   加载动画:number;
}

/**
 * 2004-场景载入界面 [BASE]
 */
class GUI_2004 extends GUI_BASE {
   界面背景:UIBitmap;
   加载动画:UIAnimation;
   constructor(){
      super(2004);
   }
}
class ListItem_2004 extends UIListItemData {
   界面背景:string;
   加载动画:number;
}

/**
 * 2005-返回标题时载入界面 [BASE]
 */
class GUI_2005 extends GUI_BASE {
   界面背景:UIBitmap;
   加载动画:UIAnimation;
   constructor(){
      super(2005);
   }
}
class ListItem_2005 extends UIListItemData {
   界面背景:string;
   加载动画:number;
}

/**
 * 3001-我的界面 [BASE]
 */
class GUI_3001 extends GUI_BASE {
   图片:UIBitmap;
   按钮:UIButton;
   文本:UIString;
   constructor(){
      super(3001);
   }
}
class ListItem_3001 extends UIListItemData {
   图片:string;
   文本:string;
}

/**
 * 3002- [BASE]
 */
class GUI_3002 extends GUI_BASE {

   constructor(){
      super(3002);
   }
}
class ListItem_3002 extends UIListItemData {

}

/**
 * 3003- [BASE]
 */
class GUI_3003 extends GUI_BASE {

   constructor(){
      super(3003);
   }
}
class ListItem_3003 extends UIListItemData {

}

/**
 * 3004- [BASE]
 */
class GUI_3004 extends GUI_BASE {

   constructor(){
      super(3004);
   }
}
class ListItem_3004 extends UIListItemData {

}

/**
 * 3005- [BASE]
 */
class GUI_3005 extends GUI_BASE {

   constructor(){
      super(3005);
   }
}
class ListItem_3005 extends UIListItemData {

}

/**
 * 15001- [BASE]
 */
class GUI_15001 extends GUI_BASE {

   constructor(){
      super(15001);
   }
}
class ListItem_15001 extends UIListItemData {

}
GameUI["__compCustomAttributes"] = {"UIRoot":["enabledLimitView","scrollShowType","hScrollBar","hScrollBg","vScrollBar","vScrollBg","scrollWidth","slowmotionType","enabledWheel","hScrollValue","vScrollValue"],"UIButton":["label","image1","grid9img1","image2","grid9img2","image3","grid9img3","fontSize","color","overColor","clickColor","bold","italic","smooth","align","valign","letterSpacing","font","textDx","textDy","textStroke","textStrokeColor"],"UIBitmap":["image","grid9","flip","pivotType"],"UIString":["text","fontSize","color","bold","italic","smooth","align","valign","leading","letterSpacing","font","wordWrap","overflow","shadowEnabled","shadowColor","shadowDx","shadowDy","stroke","strokeColor","onChangeFragEvent"],"UIVariable":["varID","fontSize","color","bold","italic","smooth","align","valign","leading","letterSpacing","font","wordWrap","overflow","shadowEnabled","shadowColor","shadowDx","shadowDy","stroke","strokeColor","onChangeFragEvent"],"UICustomGameNumber":["customData","previewNum","previewFixed","fontSize","color","bold","italic","smooth","align","valign","leading","letterSpacing","font","wordWrap","overflow","shadowEnabled","shadowColor","shadowDx","shadowDy","stroke","strokeColor"],"UICustomGameString":["customData","inEditorText","fontSize","color","bold","italic","smooth","align","valign","leading","letterSpacing","font","wordWrap","overflow","shadowEnabled","shadowColor","shadowDx","shadowDy","stroke","strokeColor"],"UIAvatar":["avatarID","scaleNumberX","scaleNumberY","orientationIndex","avatarFPS","playOnce","isPlay","avatarFrame","actionID","avatarHue"],"UIStandAvatar":["avatarID","actionID","scaleNumberX","scaleNumberY","flip","playOnce","isPlay","avatarFrame","avatarFPS","avatarHue"],"UIAnimation":["animationID","scaleNumberX","scaleNumberY","aniFrame","playFps","playType","showHitEffect","silentMode"],"UIInput":["text","fontSize","color","bold","italic","align","leading","font","wordWrap","restrict","inputMode","maxChars","shadowEnabled","shadowColor","shadowDx","shadowDy","onInputFragEvent","onEnterFragEvent"],"UICheckBox":["selected","image1","grid9img1","image2","grid9img2","onChangeFragEvent"],"UISwitch":["selected","image1","grid9img1","image2","grid9img2","previewselected","onChangeFragEvent"],"UITabBox":["selectedIndex","itemImage1","grid9img1","itemImage2","grid9img2","itemWidth","itemHeight","items","rowMode","spacing","labelSize","labelColor","labelFont","labelBold","labelItalic","smooth","labelAlign","labelValign","labelLetterSpacing","labelSelectedColor","labelDx","labelDy","labelStroke","labelStrokeColor","onChangeFragEvent"],"UISlider":["image1","bgGrid9","image2","blockGrid9","image3","blockFillGrid9","step","min","max","value","transverseMode","blockFillMode","blockPosMode","fillStrething","onChangeFragEvent"],"UIGUI":["guiID","instanceClassName","dpWidth"],"UIList":["itemModelGUI","previewSize","selectEnable","repeatX","itemWidth","itemHeight","spaceX","spaceY","scrollShowType","hScrollBar","hScrollBg","vScrollBar","vScrollBg","scrollWidth","selectImageURL","selectImageGrid9","selectedImageAlpha","selectedImageOnTop","overImageURL","overImageGrid9","overImageAlpha","overImageOnTop","overSelectMode","slowmotionType"],"UIComboBox":["itemLabels","selectedIndex","bgSkin","bgGrid9","fontSize","color","bold","italic","smooth","align","valign","letterSpacing","font","textDx","textStroke","textStrokeColor","displayItemSize","listScrollBg","listScrollBar","listAlpha","itemHeight","listBgColor","itemFontSize","itemColor","itemBold","itemItalic","itemAlign","itemValign","itemLetterSpacing","itemFont","itemOverColor","itemOverBgColor","itemTextDx","itemTextDy","itemTextStroke","itemTextStrokeColor","onChangeFragEvent"],"UIVideo":["videoURL","playType","volume","playbackRate","currentTime","muted","loop","pivotType","flip","onLoadedFragEvent","onErrorFragEvent","onCompleteFragEvent"]};
