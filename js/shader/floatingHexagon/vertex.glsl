/**
 * Created by janmeier on 20.01.15.
 */
uniform float time;
uniform float amplitude;
uniform float tileX;
uniform float tileY;
attribute vec3 aCol;
varying vec3 vColor;

void main() {
    vec3 newPosition = vec3(position * 1.0);
    newPosition.y += sin(time + tileX) * sin(time + tileY) * sin(time + tileY) * amplitude;
    vColor = aCol;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
