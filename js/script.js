/* eslint-disable func-names */
/* eslint-env jquery */
const partShading = {
  Left_Trigger_Bottom: -17,
  Left_Trigger_Text_Group: 9,
  Left_Bumper_Top: -17,
  Right_Trigger_Bottom: -17,
  Right_Trigger_Text_Group: 9,
  Right_Bumper_Top: -17,
  Dpad_Down_Inner: -17,
  Dpad_Right_Inner: -17,
  Dpad_Up_Inner: -17,
  Dpad_Left_Inner: -17,
  Touchpad_Border: -17,
  Left_Stick_Inner: 17,
  Left_Stick_Border: 6,
  Stick_Inner: 17,
  Stick_Border: 6,
  Right_Stick_Inner: 17,
  Right_Stick_Border: 6,

  Controller_Outline: 6,
  Button_Base_Inner: -9,
  Dpad_Base_Inner: -9,
  Dpad_Base_Down: 6,
  Dpad_Base_Right: 6,
  Dpad_Base_Up: 6,
  Dpad_Base_Left: 6,
  Left_Stick_Base_Border: -9,
  Right_Stick_Base_Border: -9,

  Triangle_Outer: -17,
  Square_Outer: -17,
  X_Outer: -17,
  Circle_Outer: -17,

  Active_Left_Trigger_Bottom: 6,
  Active_Left_Trigger_Text_Group: -9,
  Active_Left_Bumper_Top: 6,
  Active_Right_Trigger_Bottom: 6,
  Active_Right_Trigger_Text_Group: -9,
  Active_Right_Bumper_Top: 6,
  Active_Dpad_Down_Inner: 9,
  Active_Dpad_Right_Inner: 9,
  Active_Dpad_Up_Inner: 9,
  Active_Dpad_Left_Inner: 9,
  Active_Touchpad_Border: 6,
  Active_Left_Stick_Inner: -4,
  Active_Left_Stick_Border: 6,
  Active_Right_Stick_Inner: -4,
  Active_Right_Stick_Border: 6,

  Active_Dpad_Base_Down: 6,
  Active_Dpad_Base_Right: 6,
  Active_Dpad_Base_Up: 6,
  Active_Dpad_Base_Left: 6,

  Active_Triangle_Outer: -17,
  Active_Square_Outer: -17,
  Active_X_Outer: -17,
  Active_Circle_Outer: -17,
};


$(document).ready(() => {
  $('#controllerActiveSvg').css('display', 'none');
  $('#disconnectedSvg').css('display', 'none');
});

$('#layerSelect').find('li.row[parts]').each(function () {
  const parts = JSON.parse($(this).attr('parts'));
  parts.forEach((part) => {
    if (part.startsWith('Disconnected_') || part.startsWith('Active_')) {
      $(this).css('display', 'none');
      if ($(this).parents('li.group').length) $(this).parents('li.group').css('display', 'none');
    }
  });
});
$('#layerSelect li.row[select]').click(function () {
  const toViewId = $(this).attr('select');
  $('.centerSvgHolder > .centerSvg').find('object').each(function () {
    $(this).css('display', 'none');
  });
  $(`#${toViewId}`).css('display', 'unset');
  $('#layerSelect').find('li.row[parts]').each(function () {
    const parts = JSON.parse($(this).attr('parts'));
    parts.forEach((part) => {
      $(this).css('display', 'block');
      if ($(this).parents('li.group').length) $(this).parents('li.group').css('display', 'block');
      if (toViewId === 'controllerSvg') {
        if (part.startsWith('Disconnected_') || part.startsWith('Active_')) {
          $(this).css('display', 'none');
          if ($(this).parents('li.group').length) $(this).parents('li.group').css('display', 'none');
        }
      } else if (toViewId === 'controllerActiveSvg') {
        if (!part.startsWith('Active_')) {
          $(this).css('display', 'none');
          if ($(this).parents('li.group').length) $(this).parents('li.group').css('display', 'none');
        }
      } else if (toViewId === 'disconnectedSvg') {
        if (!part.startsWith('Disconnected_')) {
          $(this).css('display', 'none');
          if ($(this).parents('li.group').length) $(this).parents('li.group').css('display', 'none');
        }
      }
    });
  });
});
$('#layerSelect li.row:not([select])').click(function lastClicked(event) {
  event.stopPropagation();
  if (event.ctrlKey) {
    $(this).find('div.selectedRow').addClass('selected');
    const currentColors = [];
    $('#layerSelect li.row .selectedRow.selected').each(function getColors() {
      const color = $(this).parent().find('div.currentColor').css('background-color');
      currentColors.push(color);
    });
    const sameColors = currentColors.every((val, i, arr) => val === arr[0]);
    if (sameColors) {
      const colArray = currentColors[0].split(',').map((clr) => +clr.replace(/\D/g, ''));
      const colObj = { r: colArray[0], g: colArray[1], b: colArray[2] };
      $('#colorPicker').colpickSetColor(colObj, true);
    }
  } else {
    $('#layerSelect li.row').not($(this)).find('div.selectedRow').removeClass('selected');
    $(this).find('div.selectedRow').addClass('selected');
    if (!$(this).find('div.currentColor').attr('style')) return;
    const currentColor = $(this).find('div.currentColor').css('background-color');
    const colArray = currentColor.split(',').map((clr) => +clr.replace(/\D/g, ''));
    const colObj = { r: colArray[0], g: colArray[1], b: colArray[2] };
    $('#colorPicker').colpickSetColor(colObj, true);
  }
});

$('#layerSelect li.group').click(function dropdownGroup(event) {
  event.stopPropagation();
  $(this).find('ul:first').toggle();
  const nestedGroup = $(this).parent().parent();
  if (nestedGroup.hasClass('group') && $(this).find('ul:first').is(':visible')) {
    $(this).css('margin-bottom', `${$(this).find('ul:first').innerHeight() + 2}px`);
  } else {
    $(this).css('margin-bottom', '2px');
  }

  if (nestedGroup.hasClass('group') && $(this).is(':visible')) {
    nestedGroup.css('margin-bottom', `${$(this).parent().innerHeight() + 2}px`);
  } else {
    nestedGroup.css('margin-bottom', '2px');
  }
  if (!nestedGroup.hasClass('group')) {
    if ($(this).find('ul:first').is(':visible')) {
      $(this).css('margin-bottom', `${$(this).find('ul:first').innerHeight() + 2}px`);
    } else {
      $(this).css('margin-bottom', '2px');
    }
  }
  if ($(this).find('i:first').hasClass('fa-angle-up')) {
    $(this).find('i:first').removeClass('fa-angle-up');
    $(this).find('i:first').addClass('fa-angle-down');
  } else {
    $(this).find('i:first').removeClass('fa-angle-down');
    $(this).find('i:first').addClass('fa-angle-up');
  }
});

$('#exportJson').click(() => {
  console.log('Exporting!');
  const gradient = document.getElementById('controllerSvg').getSVGDocument().getElementById('Controller_Gradient');
  console.log(gradient.style.display && gradient.style.display === 'none');
  const jsonExport = {
    gradient: !(gradient.style.display && gradient.style.display === 'none'),
    parts: [],
  };
  $('li[parts]').each(function () {
    const parts = $(this).attr('parts');
    const color = rgb2hex($(this).find('div.currentColor').css('background-color'));
    const mode = $(this).attr('mode');
    jsonExport.parts.push({ parts, color, mode });
  });
  const exportJson = $('#downloadJson');
  const file = new Blob([JSON.stringify(jsonExport)], { type: 'application/json' });
  exportJson.attr('href', URL.createObjectURL(file));
  exportJson.attr('download', 'controller');
  exportJson[0].click();
});

$('#importJson').click(() => {
  $('#importInput').click();
});


$('#importInput').change(function () {
  const file = $(this).prop('files')[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const jsonImport = JSON.parse(event.target.result);
    const gradient = document.getElementById('controllerSvg').getSVGDocument().getElementById('Controller_Gradient');
    const gradientActive = document.getElementById('controllerActiveSvg').getSVGDocument().getElementById('Controller_Gradient');
    gradient.style.display = jsonImport.gradient ? 'block' : 'none';
    gradientActive.style.display = jsonImport.gradient ? 'block' : 'none';
    jsonImport.parts.forEach((element) => {
      handleColorChange(JSON.parse(element.parts), element.color, element.mode);
    });
  };
  reader.onerror = (error) => console.log(error);
  reader.readAsText(file, 'UTF-8');
});

$('#gradientToggle').click(() => {
  const gradient = document.getElementById('controllerSvg').getSVGDocument().getElementById('Controller_Gradient');
  const gradientActive = document.getElementById('controllerActiveSvg').getSVGDocument().getElementById('Controller_Gradient');
  if (gradient.style.display && gradient.style.display === 'none') {
    gradient.style.display = 'block';
    gradientActive.style.display = 'block';
  } else {
    gradient.style.display = 'none';
    gradientActive.style.display = 'none';
  }
});

function rgb2hex(orig) {
  const rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
  return (rgb && rgb.length === 4) ? `#${
    (`0${parseInt(rgb[1], 10).toString(16)}`).slice(-2)
  }${(`0${parseInt(rgb[2], 10).toString(16)}`).slice(-2)
  }${(`0${parseInt(rgb[3], 10).toString(16)}`).slice(-2)}` : orig;
}

function handleColorChange(ids, hex, mode = false) {
  ids.forEach((part) => {
    if (part.endsWith('_Group')) {
      $('.centerSvg').find('object').each(function () {
        const svgId = $(this).attr('id');
        const svgPart = document.getElementById(svgId).getSVGDocument().getElementById(part);
        if (!svgPart) return;
        $(svgPart).find('path,circle,ellipse,polygon')
          .each(function changeGroup() {
            $(this).css('fill', hex);
            if (mode && partShading[part]) $(this).css('fill', shadeColor(hex, partShading[part]));
          });
      });
      $(`li[parts*='"${part}"']`).each(function () {
        $(this).find('div.currentColor').css('background-color', hex);
        if (JSON.parse($(this).attr('parts')).length > 1) return;
        if (mode && partShading[part]) $(this).find('div.currentColor').css('background-color', shadeColor(hex, partShading[part]));
      });
    } else if (part === 'PS4_Home_Border') {
      $('.centerSvg').find('object').each(function () {
        const svgId = $(this).attr('id');
        const svgPart = document.getElementById(svgId).getSVGDocument().getElementById('PS4_Home_Inner');
        if (!svgPart) return;
        svgPart.style.stroke = hex;
      });
    } else if (part.startsWith('Stick_')) {
      const type = part.split('_').pop();
      handleColorChange([`Left_Stick_${type}`], hex);
      handleColorChange([`Right_Stick_${type}`], hex);
      $(`li[parts*='"${part}"']`).each(function () {
        $(this).find('div.currentColor').css('background-color', hex);
        if (JSON.parse($(this).attr('parts')).length > 1) return;
        if (mode && partShading[part]) $(this).find('div.currentColor').css('background-color', shadeColor(hex, partShading[part]));
      });
    } else {
      $('.centerSvg').find('object').each(function () {
        const svgId = $(this).attr('id');
        const svgPart = document.getElementById(svgId).getSVGDocument().getElementById(part);
        if (!svgPart) return;
        svgPart.style.fill = hex;
        if (mode && partShading[part]) svgPart.style.fill = shadeColor(hex, partShading[part]);
        $(`li[parts*='"${part}"']`).each(function () {
          $(this).find('div.currentColor').css('background-color', hex);
          if (JSON.parse($(this).attr('parts')).length > 1) return;
          if (mode && partShading[part]) $(this).find('div.currentColor').css('background-color', shadeColor(hex, partShading[part]));
        });
      });
    }
  });
}

function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100, 10);
  G = parseInt(G * (100 + percent) / 100, 10);
  B = parseInt(B * (100 + percent) / 100, 10);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  const RR = ((R.toString(16).length === 1) ? `0${R.toString(16)}` : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? `0${G.toString(16)}` : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? `0${B.toString(16)}` : B.toString(16));

  return `#${RR}${GG}${BB}`;
}
