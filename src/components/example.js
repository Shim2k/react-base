import React from 'react';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    loadJSON() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadJSON();
    }

    render() {
        var exampleList = this.state.data.map((example, index) => {
            return (
                <h2 key={index} className="title">
                    {example.data}
                </h2>
            );
        });

        return (
            <div className="post-list">
                {exampleList}
            </div>
        )
    }
};