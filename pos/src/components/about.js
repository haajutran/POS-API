import React, { Component } from "react";
import FroalaEditorFunctionality from "react-froala-wysiwyg";

class About extends Component {
  constructor() {
    super();

    this.state = {
      model: "Example text"
    };
  }

  handleModelChange = model => {
    console.log(model);
    this.setState({
      model: model
    });
  };

  render() {
    const config = {
      imagePaste: true,
      imageUpload: true,
      imageUploadParam: "image_param",

      // Set the image upload URL.
      imageUploadURL: "/upload_image",

      // Additional upload params.
      imageUploadParams: { id: new Date().toString() },

      // Set request type.
      imageUploadMethod: "POST",

      // Set max image size to 5MB.
      imageMaxSize: 5 * 1024 * 1024,

      // Allow to upload PNG and JPG.
      imageAllowedTypes: ["jpeg", "jpg", "png"],
      placeholderText: "Edit Your Content Here!",
      pluginsEnabled: [
        "image",
        "link",
        "print",
        "align",
        "embedly",
        "table",
        "ul",
        "ol",
        "hr",
        "video",
        "word_paste",
        "fullscreen",
        "colors",
        "fontFamily"
      ],
      toolbarButtons: [
        [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting"
        ],
        [
          "undo",
          "redo",
          "print",
          "insertTable",
          "insertImage",
          "fontFamily",
          "fullscreen"
        ]
      ],
      events: {
        "image.beforeUpload": function(images) {
          // Return false if you want to stop the image upload.
        },
        "image.uploaded": function(response) {
          // Image was uploaded to the server.
        },
        "image.inserted": function($img, response) {
          // Image was inserted in the editor.
        }
      }
    };

    return (
      <div>
        <FroalaEditorFunctionality
          config={config}
          model={this.state.model}
          onModelChange={this.handleModelChange}
        />
      </div>
    );
  }
}

export default About;
