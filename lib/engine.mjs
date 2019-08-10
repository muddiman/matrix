//  filename:   engine.mjs
//  path:       /lib/engine.mjs

/*
                                                Title: THE MATRIX CODE RAIN EFFECT
                                                Language: Javascript
                                                Programmer: Roger A. Clarke (A.K.A. .muddicode)
                                                Code: Game Engine    (Main Animation loop Class)                        
*/

/*   Game Engine    */
export const gEngine = function(time_step, update, render) {
    this.time_interval  = time_step;                // related to the games frame rate
    this.update         = update;                   // update function
    this.render         = render;                   // render function (undefined)
    this.time           = 0;                        // previous time_stamp
    this.accumulated_time = 0;                      // amt. of time that has accumulated since last update fcn call
    this.isUpdated      = false;
    this.frameNo        = null;
    this.animate          = function () {
                            this.init(time_step, update, render);
                            // var n=0;                // for debugging
                            // var r=0;
                            // (async function () {
                            this.running = setInterval(async () => {
                                // render();
                               let time_stamp = Date.now();
                                if (this.time === 0) {
                                    this.time = time_stamp;
                                } 
                                this.accumulated_time += time_stamp - this.time;
                                // console.log(this.accumulated_time);                     // debugging
                                this.time = time_stamp;
                                await this.update();
                                await this.render();
                            /*  this check ensures the system won't crash trying to keep up with timely cycles 
                            it ignores updates & renders if the accumulated time extends for more than 3 cycles   */
                            if (this.accumulated_time >= this.time_interval * 3) {
                                this.accumulated_time = this.time_interval;
                                //  debug
                                n++;
                                // console.log(`A lot behind ${n}`);
                            }
                            /*  keeps the engine updated if cycle time lapses for more than a cycle     */
                            while (this.accumulated_time >= this.time_interval) {
                                this.accumulated_time -= this.time_interval;
                                this.update();
                                this.isUpdated = true;
                            }
                            if (this.isUpdated === true) {       //  screen is drawn only when when the matrix is updated
                                this.render();
                                r++;                    //   debugging
/*                                 console.log(`one behind ${r}`);  */
                                // console.log(this.accumulated_time); 
                                this.isUpdated = false;
                            }
                          }, this.time_interval);
                        //  this.frameNo = requestAnimationFrame(this.start);
                        };
    this.start          = () => {
                            let time_stamp = Date.now();
                            if (this.time === 0) {
                                this.time = time_stamp;
                            } 
                            this.accumulated_time += time_stamp - this.time;
                            console.log
                            this.time = time_stamp;
                            this.update();
                            this.render();
                            /*  this check ensures the system won't crash trying to keep up with timely cycles 
                            it ignores updates & renders if the accumulated time extends for more than 3 cycles   */
                            if (this.accumulated_time >= this.time_interval * 3) {
                                this.accumulated_time = this.time_interval;
                            }
                            /*  keeps the engine updated if cycle time lapses for more than a cycle     */
                            while (this.accumulated_time >= this.time_interval) {
                                this.accumulated_time -= this.time_interval;
                                this.update();
                                this.isUpdated = true;
                            }
                            if (this.isUpdated === true) {       //  screen is drawn only when when the matrix is updated
                                this.render();
                                this.isUpdated = false;
                            }
                            this.frameNo = requestAnimationFrame(this.start);
                        };                        
    this.stop           = () => {
                            if (this.frameNo) {
                                cancelAnimationFrame(this.frameNo);
                            } else {
                                clearInterval(this.running); 
                            }    
                        };
};
/*  Prototypes   */
gEngine.prototype.init = function (time_step, update, render) {
    this.time_interval    = time_step;                // related to the games frame rate
    this.update           = update;                   // update function
    this.render           = render;                   // render function (undefined)
    this.time             = 0;                        // previous time_stamp
    this.accumulated_time = 0;                      // amt. of time that has accumulated since last update fcn call
    this.isUpdated        = false;
    this.frameNo          = null;
};
/* gEngine.prototype.stopAnimation = function () {
    cancelAnimationFrame(this.frameNo);                                  
};
 */




/** **************************************************************************************************************************************************************
 * 
 *  @copyright (c) 2019 Roger A. Clarke. All rights reserved.
 *  @author    Roger Clarke (muddiman | .muddicode)
 *  @link      https://www.roger-clarke.com |   https://www.muddicode.com
 *  @email     rogerclarke00@hotmail.com    |   muddiman@hotmail.com             (muddi@muddicode.com | rclarke@roger-clarke.com) 
 *  @version   2.1.0
 *  @since     2019-02-7
 *  @download  https://www.github.com/muddiman/Matrix
 *  @license   NOT for 'commercial use', otherwise free to use, free to distribute
 *  @See:      http://www.roger-clarke.com/Matrix/license.html
 *             Free to use and/or distribute for personal or academic purposes.
 *             Must site the source code using the following format at beginning or end of source code file where it was used (in whole or part):
 *             "Clarke, Roger A. (2019) Matrix Code Rain Effect (ver. 2.0.1) [Source Code]. New York, 
 *             NY. http://www.roger-clarke.com, https://www.github.com/muddiman". 
 * 
***************************************************************************************************************************************************************************************** */
