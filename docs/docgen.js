var vueDocs = require('vue-docgen-api');
var glob = require('glob')
var writeFile = require('write-file')

var remove_src_kytos= "../src/components/kytos/"

function write_header(component, key='-'){
  var text = component.displayName+"\n"+Array(component.displayName.length+1).join(key)+"\n\n"
  text += component.description + "\n\n"
  return text
}

function write_examples(component){
  if(component.tags.hasOwnProperty('examples') === false) return ""

  var text = ""
  for(i in component.tags.examples){
    if (component.tags.examples[i].description.includes('/_static/'))
    {
      text += "**Image**\n\n"
      text += ".. image:: "+component.tags.examples[i].description+"\n"
      text += "    :align: center"
    }else{
      text += "**Example**\n\n"
      text += ".. code-block:: html\n\n    "
      text += component.tags.examples[i].description
    }
    text += '\n\n'
  }
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
    var descriptions = prop.description.split('\n')
    content.push([name, type, required, defaultValue, descriptions[0].trim()])
    for(d in descriptions){
      if (d == 0) continue
      content.push(['', '', '', '', descriptions[d].trim()])
    }
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
    text+= "**"+method.name + "**: "+ method.description + "\n\n"
    var content = []
    for(l in method.params){
      var params = method.params[l]
      descriptions = params.description.split('\n')
      content.push([params.name, params.type.name, descriptions[0].trim()])
      for(d in descriptions){
        if(d == 0) continue
        content.push(['', '', descriptions[d].trim()])
      }
    }
    if (content.length > 0){
      text += "**Parameters**\n\n"
      text += create_rst_table(methods_headers, content)
    }
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
  var text = "**"+component.displayName+"**\n\n"
  var content = []
  var event_header = ['name', 'type', 'description']
  for(name in component.events){
    var event_object = component.events[name]
    content.push([name, event_object['type']['names'].join('|'), event_object['description']])
  }
  text += create_rst_table(event_header,content)
  return text
}

function rst_content(component){
  var rst_text = ""
  rst_text += write_header(component)
  rst_text += write_examples(component)
  rst_text += write_parameters(component)
  rst_text += write_methods(component)
  rst_text += write_slots(component)
  return rst_text
}

var pattern = "../src/components/kytos/**/**/*.vue"
var ignore_list = ['logging', 'map', 'terminal', 'topology',
                   'napp', 'tabs', 'chart', 'switch']
var options = null

glob(pattern, options, function (er, files) {
  var last_group = ""
  var destination = ""
  var current_group = ""
  var content = ""
  var events = ""

  files = files.filter(function(item){
    for(var i in ignore_list ){
      if(item.includes(ignore_list[i]))
        return false
    }
    return true
  })

  for(i in files){
    var filename = files[i]
    current_group = files[i].replace(remove_src_kytos, '').split('/')[0]

    if(last_group != current_group)
    {
      content += Array(current_group.length+1).join('=')+ "\n"
      content += current_group+"\n"
      content += Array(current_group.length+1).join('=')+ "\n\n"
    }
    last_group = current_group
    component = vueDocs.parse(filename)
    content += rst_content(component)
    events += write_events(component)
  }

  destination = "source/components.rst"
  writeFile(destination, content, function (err) {
    if (err) return console.log(err)
  })

  destination = "source/events.rst"
  writeFile(destination, events, function (err) {
    if (err) return console.log(err)
  })
})
