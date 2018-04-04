import io from 'socket.io-client'

export default {
  name: 'logging-utils',
  data() {
    return {
      logs_url: this.$kytos_server,
      connect_timeout: 1000,
      level_types:['DEBUG', 'INFO', 'WARN', 'ERROR', 'CRITICAL'],
      channels: new Set(),
      logs: [],
      max_lines: 100,
      socket:null
    }
  },
  mounted(){
    this.load()
  },
  methods: {
    load: function(){
      this.socket = io.connect(this.logs_url, {'connect timeout': this.connect_timeout})
      this.socket.on('connect', this.on_connect)
      this.socket.on('disconnect', this.on_disconnect)
      this.socket.on('show logs', this.show_logs)
    },
    on_connect: function(){
      console.log('connected')
      // restore channel subscriptions
      for (let channel of this.channels) {
        this.join_channel(channel,true);
      }
    },
    on_disconnect:  function(){
        console.log('disconnected')
    },
    show_logs: function(new_lines){
      var total_lines = new_lines.length + this.logs.length
      if (total_lines > this.max_lines){
        var excess = total_lines - this.max_lines
        this.logs = this.logs.slice(excess)
      }
      for (let line of new_lines){
        var data_msg = {level: this.get_level(line), msg: line, display: true}
        this.logs.push(data_msg);
      }
    },
    get_level: function(line){
      for (let level of this.level_types){
        if(line.includes(level)){
          return level.toLowerCase();
        }
      }
    },
    join_channel: function(channel, force = false){
      var channels = this.channels
      if (this.socket.connected && (!this.channels.has(channel) || force)) {
         this.socket.emit('join', channel, function() {
           channels.add(channel)
           console.log('Subscribed to ' + channel);
         });
      }
      console.log('Subscriptions: ', this.channels);
      console.log(this.channels);
    },
    leave_channel: function(channel){
      var channels = this.channels
      if (this.channels.has(channel) && this.socket.connected) {
         this.socket.emit('leave', channel, function() {
           channels.delete(channel);
           console.log('Unsubscribed from ' + channel);
         });
      }
      console.log('Subscriptions: ' + this.channels);
    }
  }
}
