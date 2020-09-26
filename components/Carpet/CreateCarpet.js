import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "../styles/Form";

// import ErrorMessage from "./ErrorMessage";

const CREATE_CARPET_MUTATION = gql`
  mutation CREATE_CARPET_MUTATION(
    $customer: String!
    $images: [String]!
    $address: String
    $phoneNumber: String
    $carpets: [carpetDetailsCreateInput]!
  ) {
    createCarpet(
      customer: $customer
      images: $images
      phoneNumber: $phoneNumber
      address: $address
      carpets: $carpets
    ) {
      id
    }
  }
`;

class CreateCarpet extends Component {
  state = {
    customer: "fadsfads",
    images: [],
    phoneNumber: "132131",
    address: "fdafas",
    numberOfCarpets: 1,
    carpets: [{ measure: "", pricePerMeter: "" }],
  };
  handleChange = (e) => {
    const { name, type, value } = e.target;
    // const parsedValue = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: value });
  };

  handleCarpetValueChange = (e, index) => {
    const newArray = [...this.state.carpets];

    const name = e.target.name;
    newArray[index][name] = e.target.value;
    this.setState({ carpets: newArray });
  };

  addArrayElement = (name) => {
    const newArray = [...this.state.carpets];
    newArray.push({ measure: "", pricePerMeter: "" });

    this.setState({ carpets: newArray });
  };

  removeArrayElement = (index) => {
    let newArray = [...this.state.carpets];
    newArray.pop();

    this.setState({ carpets: newArray });
  };

  uploadFile = async (e) => {
    const files = Object.values(e.target.files);
    const data = new FormData();
    // console.log(files);
    // // console.log(typeof files);
    // // console.log(Object.values(files));
    data.append("upload_preset", "aladinko");
    const filesPromises = await files.map(async (file) => {
      data.append("file", file);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvvbls283/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedFile = await response.json();

      const uploadedImages = [];
      if (uploadedFile) {
        uploadedImages.push(this.uploadFile.secure_url);
      }

      this.setState({ images: uploadedImages });

      return uploadedFile;
      // const file = await response.json();

      //   console.log(file);
    });

    console.log(filesPromises);
    if (filesPromises)
      Promise.all(filesPromises).then((done) => {
        const uploadedImages = [];
        done.forEach((image) => {
          uploadedImages.push(image.secure_url);
        });

        console.log(uploadedImages);
        this.setState({ images: uploadedImages });

        console.log("here", done);
      });

    console.log(data);

    this.setState({
      images: file.secure_url,
    });
  };
  render() {
    const { carpets } = this.state;

    console.log(this.state);
    return (
      <Mutation mutation={CREATE_CARPET_MUTATION} variables={this.state}>
        {(createCarpet, { loading, error }) => (
          <Form
            data-test="createCarpetForm"
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await createCarpet();
              const itemId = response.data.createCarpet.id;
              // Router.push({ pathname: "/item", query: { id: itemId } });
            }}
          >
            {/* <ErrorMessage error={error} /> */}
            <fieldset disabled={loading} aria-busy={loading}>
              {/* <label htmlFor="file">
                images
                <input
                  type="file"
                  name="file"
                  id="file"
                  placeholder="Upload an images"
                  required
                  multiple
                  //value={this.state.images}
                  onChange={this.uploadFile}
                />
                {this.state.images &&
                  this.state.images.map((image) => (
                    <img src={image} alt="Upload images" width="200" />
                  ))}
              </label> */}
              <label htmlFor="customer">
                Stranka
                <input
                  type="text"
                  name="customer"
                  id="customer"
                  placeholder="Stranka"
                  required
                  value={this.state.customer}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="address">
                Naslov
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Naslov"
                  required
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="phoneNumber">
                Telefonska številka
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Tel.št"
                  required
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </label>

              <button onClick={() => this.addArrayElement()}>+</button>
              {carpets.map((carpet, index) => (
                <div className="carpet-details__wrapper">
                  <div className="carpet-details">
                    <label htmlFor="measure">
                      Meritev
                      <input
                        type="number"
                        name="measure"
                        id="measure"
                        placeholder="Meritev"
                        required
                        value={carpet.measure}
                        onChange={(e) => this.handleCarpetValueChange(e, index)}
                      />
                    </label>
                  </div>
                  <div className="carpet-details">
                    <label htmlFor="pricePerMeter">
                      Cena na m2
                      <input
                        type="number"
                        name="pricePerMeter"
                        id="pricePerMeter"
                        placeholder="Cena na m2"
                        required
                        value={carpet.pricePerMeter}
                        onChange={(e) => this.handleCarpetValueChange(e, index)}
                      />
                    </label>
                  </div>
                  <button
                    className="remove-carpet"
                    onClick={() => this.removeArrayElement()}
                  >
                    -
                  </button>
                </div>
              ))}

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateCarpet;
export { CREATE_CARPET_MUTATION };
