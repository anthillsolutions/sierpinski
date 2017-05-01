import { Component, OnInit, ElementRef, Input, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  private canvas: any;
  private sq: number = 4;
  private padding: number = 50;
  private iterations: number = 10000;
  innerHeight: any;
  innerWidth: any;
  @ViewChild('canvas') canvasRef:ElementRef;

  constructor() {
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvas.width = this.innerWidth;
    this.canvas.height = this.innerHeight;
    this.draw();
  }

  draw() {
    if(this.canvas.getContext) {
      const c = this.canvas.getContext('2d');
      c.fillStyle = '#226474';
      c.fillRect(0,0,this.innerWidth,this.innerHeight);
      c.fillStyle = 'black';
      this.drawSquare(c, this.getA(), 'white');
      this.drawSquare(c, this.getB(), 'white');
      this.drawSquare(c, this.getC(), 'white');

      // Initial point
      let current = {
        x: this.innerWidth / 2,
        y: this.innerHeight / 2,
      };
      this.drawPoint(c, current, '#666666');

      let stack = [];
      const _this = this;
      for (var i = 0; i < this.iterations; i++) {
        stack.push(new Promise(function (resolve, reject) {
            setTimeout(function () {
                current = _this.drawRandomPoint(c, current, '#999999');
            }, 500);
        }));
      }

      Promise.all(stack);
    }
  }

  drawSquare(c, point, color) {
    c.fillStyle = color;
    c.fillRect(point.x - this.sq / 2, point.y - this.sq / 2, this.sq, this.sq);
  }

  drawPoint(c, point, color) {
    const size = 2;
    c.fillStyle = color;
    c.beginPath();
    c.arc(point.x, point.y, size, 0, 2 * Math.PI, false);
    c.fill();
  }

  drawRandomPoint(c, current, color) {
    // Get next point
    let r = Math.random();
    if (r < 0.333) {
      current = {
        x: current.x + (this.getA().x - current.x) / 2,
        y: current.y + (this.getA().y - current.y) / 2,
      };
    } else if (r < 0.666) {
      current = {
        x: current.x + (this.getB().x - current.x) / 2,
        y: current.y + (this.getB().y - current.y) / 2,
      };
    } else {
      current = {
        x: current.x + (this.getC().x - current.x) / 2,
        y: current.y + (this.getC().y - current.y) / 2,
      };
    }
    this.drawPoint(c, current, color);
    return current;
  }

  getA() {
    return {
      x: (this.innerWidth + this.sq) / 2,
      y: this.padding + this.sq / 2,
    };
  }

  getB() {
    return {
      x: this.padding + this.sq / 2,
      y: this.innerHeight - this.padding + this.sq / 2,
    };
  }

  getC() {
    return {
      x: this.innerWidth - this.padding + this.sq / 2,
      y: this.innerHeight - this.padding + this.sq / 2,
    };
  }

}
