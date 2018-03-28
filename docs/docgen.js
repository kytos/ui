var vueDocs = require('vue-docgen-api');
var glob = require('glob')
var writeFile = require('write-file')

var remove_src_kytos= "../src/components/kytos/"

function write_header(component, filename){
  var text = component.displayName+"\n"+Array(component.displayName.length+1).join("-")+"\n\n"
  text += component.description + "\n\n"
  return text
}

function calculate_space(sizes, content){
  for(l in content){
    for(c in content[l]){
      if(content[l][c].length > sizes[c]) sizes[c] = content[l][c].length
    }
  }
}

function add_slash(header_size){
  var text = ""
  for(i in header_size){
    text += Array(header_size[i]+1).join('=')+ " "
  }
  text += "\n"
  return text
}

function add_line(array_size, array){
  var text = ""
  for(i in array){
    text += array[i]+ Array(Math.abs(array_size[i]-array[i].toString().length)+1).join(' ') + " "
  }
  text+= "\n"
  return text
}

function create_rst_table(headers, content){
  var text = ""
  var header_size = headers.map(function(header){ return header.length })
  calculate_space(header_size, content)
  text+= add_slash(header_size)
  text+= add_line(header_size, headers)
  text+= add_slash(header_size)
  for(l in content) text+= add_line(header_size, content[l])
  text+= add_slash(header_size)
  text+= '\n'
  return text
}

function write_parameters(component){
  if(component.props === undefined) return ''
  var text = "**Parameters**\n\n"
  var headers = ['name', 'type', 'required', 'default', 'description']
  var content = []
  for(name in component.props)
  {
    prop = component.props[name]
    var type = prop.type.name
    var required = prop.required || 'false'
    var defaultValue = ""
    if(prop.hasOwnProperty("defaultValue"))
      defaultValue = prop.defaultValue.value
    var description = prop.description
    content.push([name, type, required, defaultValue, description])
  }
  text += create_rst_table(headers, content)
  return text
}

function write_methods(component){
  if(component.methods.length === 0){
    return ''
  }

  var text = "**Methods**\n\n"
  var methods_headers = ['name', 'type', 'description']
  for(i in component.methods)
  {
    method = component.methods[i]
    text+= "*"+method.name + "*: "+ method.description + "\n\n"
    var content = []
    for(l in method.params){
      var params = method.params[l]
      content.push([params.name, params.type.name, params.description])
    }
    text += "**Parameters**\n\n"
    text += create_rst_table(methods_headers, content)
  }

  return text
}

function write_slots(component){
  if (Object.keys(component.slots) == 0) return ""
  var text = "**Slots**\n\n"
  var content = []
  var slot_header = ['name', 'description']
  for(slot in component.slots){
    var description = ""
    if(component.slots[slot].hasOwnProperty("description"))
      description = component.slots[slot]['description']
    content.push([slot, description])
  }
  text += create_rst_table(slot_header,content)
  return text
}

function write_events(component){
  if (Object.keys(component.events) == 0) return ""
  var text = "**Events**\n\n"
  var content = []
  var event_header = ['name', 'type', 'description']
  for(name in component.events){
    var event_object = component.events[name]
    content.push([name, event_object['type']['names'].join('|'), event_object['description']])
  }
  text += create_rst_table(event_header,content)
  return text
}

function rst_content(component, filename){
  var rst_text = ""
  rst_text += write_header(component, filename)
  rst_text += write_parameters(component)
  rst_text += write_methods(component)
  rst_text += write_slots(component)
  rst_text += write_events(component)
  return rst_text
}

var pattern = "../src/components/kytos/**/**/*.vue"
var options = null

glob(pattern, options, function (er, files) {
  var last_group = ""
  var destination = ""
  var current_group = ""
  var content = ""
  for(i in files){
    var filename = files[i]
    if (files[i] === '../src/components/kytos/map/MapBoxSettings.vue') continue
    current_group = files[i].replace(remove_src_kytos,'').split('/')[0]

    if (last_group !== "" && last_group !== current_group){
      destination = "source/components/"+ last_group+".rst"
      writeFile(destination, content, function (err) {
        if (err) return console.log(err)
      })
      content = ""
    }
    last_group = current_group

    if(content === "")
    {
      content += Array(current_group.length+1).join('=')+ "\n"
      content += current_group+"\n"
      content += Array(current_group.length+1).join('=')+ "\n\n"
    }
    content += rst_content(vueDocs.parse(filename), filename)

    if (files[files.length-1] === filename){
      destination = "source/components/"+ last_group+".rst"
      writeFile(destination, content, function (err) {
        if (err) return console.log(err)
      })
    }
  }
})
