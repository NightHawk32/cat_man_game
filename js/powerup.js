// PowerUp class - Manages power-up state and effects

class PowerUp {
    constructor() {
        this.active = false;
        this.startTime = 0;
        this.duration = GAME_CONFIG.POWER_UP_DURATION;
        this.flashTime = GAME_CONFIG.POWER_UP_FLASH_TIME;
    }
    
    activate() {
        this.active = true;
        this.startTime = Date.now();
    }
    
    deactivate() {
        this.active = false;
    }
    
    update() {
        if (this.active) {
            const elapsed = Date.now() - this.startTime;
            if (elapsed >= this.duration) {
                this.deactivate();
                return false; // Power-up expired
            }
        }
        return this.active;
    }
    
    isFlashing() {
        if (!this.active) return false;
        const elapsed = Date.now() - this.startTime;
        return elapsed >= (this.duration - this.flashTime);
    }
    
    getRemainingTime() {
        if (!this.active) return 0;
        const elapsed = Date.now() - this.startTime;
        return Math.max(0, this.duration - elapsed);
    }
    
    reset() {
        this.active = false;
        this.startTime = 0;
    }
}
