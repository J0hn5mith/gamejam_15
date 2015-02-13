
function rand(min, max) {
  return min + Math.floor((1 + max - min) * Math.random());
}


function randFloat(min, max) {
  return min + ((max - min) * Math.random());
}


function zeroOrOne(probabilityOfOne) {
  return randFloat(0.0, 1.0) < probabilityOfOne;
}


function distance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt((dx * dx) + (dy * dy));
}


function angle(x1, y1, x2, y2) {
  return Math.atan2(x1 - x2, y2 - y1);
}


function toRad(degrees) {
  return degrees * 0.0174532;
}


function inPolygon(polygon, pointX, pointY) {
  var inside = false;
  var j = (polygon.length - 1);
  for(var i = 0; i < polygon.length; i++) {
    if(((polygon[i].y > pointY) != (polygon[j].y > pointY)) &&
        (pointX < (polygon[j].x - polygon[i].x) * (pointY - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)) {
      inside = !inside;
    }
    j = i;
  }
  return inside;
}


function normalize(vector) {
  var length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
  if(length == 0) {
    return { x : 0, y : 0 };
  }
  return { x : (vector.x / length), y : (vector.y / length) };
}


function limit(value, min, max) {
  if(value < min) {
    return min;
  }
  if(value > max) {
    return max;
  }
  return value;
}


function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}


function HSLtoRGB(h, s, l) {
    
    if(s == 0) {
        return { r : Math.round(l * 255), g : Math.round(l * 255), b : Math.round(l * 255) };
    }
    
    var q;
    if(l < 0.5) {
        q = l * (1 + s);
    } else {
        q = l + s - (l * s);
    }
    var p = (2 * l) - q;

    return {
        r : Math.round(HueToRGB(p, q, h + (1 / 3)) * 255),
        g : Math.round(HueToRGB(p, q, h) * 255),
        b : Math.round(HueToRGB(p, q, h - (1 / 3)) * 255)
    };
}


function HueToRGB(p, q, t) {
    
    if(t < 0) {
        t += 1;
    }
    if(t > 1) {
        t -= 1;
    }
    
    if(t < 1 / 6) {
        return p + (6 * (q - p) * t);
    } else if(t < 1 / 2) {
        return q;
    } else if(t < 2/3) {
        return p + (6 * (q - p) * ((2 / 3) - t));
    } else {
        return p;
    }
}


function HSLtoHex(h, s, l) {
    var rgb = HSLtoRGB(h, s, l);
    return RGBtoHex(rgb.r, rgb.g, rgb.b);
}


function RGBtoHex(r, g, b) {
    return (r * 65536) + (g * 256) + b;
}
